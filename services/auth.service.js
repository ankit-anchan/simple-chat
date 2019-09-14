const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const UserRepository = require('../repository/user.repository');
const ApplicationError = require('../common/error');
const config = require('../config');

const AuthService = {};

AuthService.login = async (loginPayload) => {
    const user = await UserRepository.findUserByUserName(loginPayload.username);
    if (!user) {
        throw new ApplicationError.Unauthorized('Username or password incorrect');
    }
    if (!bcrypt.compareSync(loginPayload.password, user.password)) {
        throw new ApplicationError.Unauthorized('Incorrect Password');
    }
    return jwt.sign({ id: user._id,username: user.mobile_number }, config[process.env.NODE_ENV].secret_key, {
        expiresIn: 604800 // expires in 24 hours
    });
};

AuthService.signUp = async (signUpPayload) => {
    const existingUser = await UserRepository.findUserByUserName(signUpPayload.username);
    if (existingUser) {
        throw new ApplicationError.Conflict('Username is already taken.');
    }
    signUpPayload.password = bcrypt.hashSync(signUpPayload.password, 10);
    let user = new User(signUpPayload);
    return UserRepository.createUser(user);
};

module.exports = AuthService;

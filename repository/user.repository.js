const User = require('../models/user.model');
const UserRepository = {};

UserRepository.createUser = async (user) => {
    return await user.save();
};

UserRepository.findUserByUserName = async (username) => {
    return await User.findOne({username: username}).lean().exec();
};

module.exports = UserRepository;

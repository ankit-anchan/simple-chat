const sinon = require('sinon');
const chai = require('chai');
chai.should();

const AuthService = require('../services/auth.service');
const UserRepository = require('../repository/user.repository');
const assert = chai.assert;
const bcrypt = require('bcryptjs');

process.env.NODE_ENV = 'test';

describe ('Auth Service', () => {
    describe ('Create new user with proper data', ()=> {

        let signUpPayload = {
            "username": "ankitanchan",
            "name": "Ankit Anchan",
            "password": "123456"
        };

        beforeEach(() => {
            sinon
                .stub(UserRepository, 'findUserByUserName')
                .callsFake(() => {
                    return Promise.reject(null);
                });
            sinon
                .stub(UserRepository, 'createUser')
                .callsFake(() => {
                    return Promise.resolve({username: signUpPayload.username, name: signUpPayload.name});
                });
        });

        afterEach(() => {
            UserRepository.findUserByUserName.restore();
            UserRepository.createUser.restore();
        });

        it ('Result should not be empty', (done) => {
            AuthService.signUp(signUpPayload)
                .then(result => {
                    result.should.exist();
                    result.should.be.a('object');
                    done();
                }).catch(err => {
                    assert.equal(null, err);
                    done();
            });
        });

        it ('Function should provide proper response', (done) => {

            AuthService.signUp(signUpPayload)
                .then(result => {
                    console.log('result = ' + JSON.stringify(result));
                    expect(result.username).to.equal(signUpPayload.username);
                    expect(result.username).to.equal(signUpPayload.name);
                    done();
                }).catch(err => {
                    assert.equal(null, err);
                    done();
            });
        });
    });

    describe ('Create user with improper data', () => {
        let signUpPayload = {
            "username": "ankitanchan",
            "name": "Ankit Anchan",
            "password": "123456"
        };
        beforeEach(() => {
            sinon
                .stub(UserRepository, 'findUserByUserName')
                .callsFake(() => {
                    return Promise.resolve({username: signUpPayload.username});
                });
            sinon
                .stub(UserRepository, 'createUser')
                .callsFake(() => {
                    return Promise.resolve({username: signUpPayload.username, name: signUpPayload.name});
                });
        });

        afterEach(() => {
            UserRepository.findUserByUserName.restore();
            UserRepository.createUser.restore();
        });

        it ('should return error for using existing username ', (done) => {
            AuthService.signUp(signUpPayload)
                .then(result => {
                    result.should.be.null;
                    done();
                })
                .catch(err => {
                    assert(409, err.status, 'User conflict');
                    done();
                });
        });
    });

    describe ('Login with proper credentials', ()=> {

        let loginPayload = {
            "username": "ankitanchan",
            "password": "123456"
        };

        beforeEach(() => {
            sinon
                .stub(UserRepository, 'findUserByUserName')
                .callsFake(() => {
                    return Promise.resolve({mobile_number: loginPayload.username, password: bcrypt.hashSync(loginPayload.password, 10), _id: 1});
                });
        });

        afterEach(() => {
            UserRepository.findUserByUserName.restore();
        });

        it ('should authenticate successfully', (done) => {
            AuthService.login(loginPayload)
                .then(result => {
                    result.should.be.a('string');
                    done();
                }).catch(done);
        });
    });

});

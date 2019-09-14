const chai = require('chai');
chai.should();
const assert = chai.assert;

const SocketRepository = require('../repository/socket.repository');

describe ('Socket Repository', () => {
    describe ('Add Sockets', () => {

        const username = 'testuser';

        beforeEach(() => {
            SocketRepository.LiveSockets = {};
            SocketRepository.SocketUsernameMap = {};
        });

        afterEach(() => {
            SocketRepository.LiveSockets = {};
            SocketRepository.SocketUsernameMap = {};
        });

        it ('should add a socket for a new user', (done) => {
            const liveUserSockets = SocketRepository.add('randomtextasinput', {message: 'this is a socket object'}, username);
            liveUserSockets.should.be.a('array');
            assert.equal(1, liveUserSockets.length);
            done();
        });

        it('should add socket for existing user', (done) => {
            let liveUserSockets = SocketRepository.add('someotherrandomtextasinput', {message: 'this is a socket object'}, username);
            liveUserSockets = SocketRepository.add('randomtextasinput', {message: 'this is a socket object'}, username);
            liveUserSockets.should.be.a('array');
            assert.equal(2, liveUserSockets.length);
            done();
        });

        it('should ignore socket if socket id is duplicate', (done) => {
            let liveUserSockets = SocketRepository.add('randomtextasinput', {message: 'this is a socket object'}, username);
            liveUserSockets = SocketRepository.add('randomtextasinput', {message: 'this is a socket object'}, username);
            liveUserSockets.should.be.a('array');
            assert.equal(1, liveUserSockets.length);
            done();
        });

    });

    describe('Delete Sockets', () => {

        let username = 'testusername';
        let socketId = 'randomtextasinput';
        let socketObject = {message: 'This is a dummy socket object'};

        beforeEach(() =>{
            SocketRepository.LiveSockets = {};
            SocketRepository.SocketUsernameMap = {};
            SocketRepository.add(socketId, socketObject, username);
        });

        afterEach(() => {
            SocketRepository.LiveSockets = {};
            SocketRepository.SocketUsernameMap = {};
        });

        it ('should delete a socket', (done) => {
            let deletedSocketList = SocketRepository.delete(socketId);
            deletedSocketList.should.be.a('array');
            assert.equal(0, deletedSocketList.length);
            done();
        });

        it ('should ignore if socket is already deleted', (done) => {
            let deletedSocketList = SocketRepository.delete(socketId);
            deletedSocketList = SocketRepository.delete(socketId);
            deletedSocketList.should.be.a('array');
            assert.equal(0, deletedSocketList.length);
            done();
        });
    });


    describe('Get Socket', () => {

        let username = 'testusername';
        let socketId = 'randomtextasinput';
        let socketObject = {message: 'This is a dummy socket object'};

        beforeEach(() => {
            SocketRepository.LiveSockets = {};
            SocketRepository.SocketUsernameMap = {};
            SocketRepository.add(socketId, socketObject, username);
        });

        afterEach(() => {
            SocketRepository.LiveSockets = {};
            SocketRepository.SocketUsernameMap = {};
        });

        it ('should return a single socket object', (done) => {
            let liveSockets = SocketRepository.get(username);
            liveSockets.should.be.a('array');
            assert.equal(1, liveSockets.length);
            done();
        });

        it ('should return a two socket objects', (done) => {
            SocketRepository.add(socketId + '123', socketObject, username);
            let liveSockets = SocketRepository.get(username);
            liveSockets.should.be.a('array');
            assert.equal(2, liveSockets.length);
            done();
        });

        it ('should return empty array if no socket object is present', (done) => {
            let liveSockets = SocketRepository.get('nonexistingusername');
            liveSockets.should.be.a('array');
            assert.equal(0, liveSockets.length);
            done();
        });
    });
});

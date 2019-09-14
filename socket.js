const socket = {};

socket.io = {};

socket.init = (_io) => {
    socket.io = _io;
    socket.listenEvents();
};

socket.listenEvents = () => {
    socket.io.sockets.on('connection', (_socket) => {
        console.log('new user connected with id ' + _socket.id);
    });

};

module.exports = socket;

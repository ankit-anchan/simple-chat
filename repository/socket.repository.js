
const SocketRepository = {};

SocketRepository.LiveSockets = {};
SocketRepository.SocketUsernameMap = {};

SocketRepository.add = (socketId, socket, username) => {
    const existingUserSocket = SocketRepository.LiveSockets[username];

    // if it's a new user, create an array and push
    if (!existingUserSocket) {
        const userSockets = [];
        userSockets.push({id: socketId, socket: socket});
        SocketRepository.LiveSockets[username] = userSockets;
        SocketRepository.SocketUsernameMap[socketId] = username;
    }
    // if it's an existing user, fetch the socket array and push the new socket into it.
    else {
        // ignore duplicate entries for same socket id
        if (SocketRepository.SocketUsernameMap[socketId]) {
            return SocketRepository.LiveSockets[username];
        }
        existingUserSocket.push({id: socketId, socket: socket});
        SocketRepository.LiveSockets[username] = existingUserSocket;
    }
    return SocketRepository.LiveSockets[username];
};

SocketRepository.delete = (socketId) => {
    const username = SocketRepository.SocketUsernameMap[socketId];
    const userSockets = SocketRepository.LiveSockets[username];
    if (!userSockets || userSockets.length === 0) {
        return [];
    }
    SocketRepository.LiveSockets[username] = userSockets.filter((value, index, arr) => {
        return value.id !== socketId;
    });
    delete SocketRepository.SocketUsernameMap[socketId];
    return SocketRepository.LiveSockets[username];
};

SocketRepository.get = (username) => {
    let socketList = SocketRepository.LiveSockets[username];
    if (!socketList) {
        return [];
    }
    return socketList;
};

module.exports = SocketRepository;

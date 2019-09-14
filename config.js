const config = {};

config.test = {
    db: {
        url: 'mongodb://localhost/simple_chat'
    },
    secret_key: 'abcd'
};

config.development = {
    db: {
        url: 'mongodb://localhost/simple_chat'
    },
    secret_key: 'abcd'
};

config.staging = {
    db: {
        url: 'mongodb://localhost/simple_chat'
    },
    secret_key: 'abcd'
};

config.production = {
    db: {
        url: 'mongodb://localhost/simple_chat'
    },
    secret_key: 'abcd'
};
module.exports = config;

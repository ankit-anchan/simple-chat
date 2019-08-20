const config = require('./config')[process.env.NODE_ENV];
const mongoose = require('mongoose');

const db = {};

db.connect = () => {
    mongoose.connect(config.db.url).then(() => {
        console.log('connected to mongo db..');
    }).catch((err) => {
        console.log('Error while connecting to mongodb');
        console.log(err);
    });
};

module.exports = db;

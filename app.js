var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

const database = require('./database');
database.connect();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth.route');

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1.0/', indexRouter);
app.use('/api/v1.0/users', usersRouter);
app.use('/api/v1.0/auth', authRouter);

const server = app.listen(port, () => {
    console.log('app started on port ' + port);
});

const io = require('socket.io').listen(server);

require('./socket').init(io);


module.exports = app;

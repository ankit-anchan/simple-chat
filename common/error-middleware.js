var ApplicationError = require('./error');
var ErrorHandler = function(error, req, res, next) {
    console.log(error.message);
    // check the type of the error thrown and set status code accordingly
    let statusCode = error.statusCode || error.status;
    if (error instanceof ApplicationError.NotFound)
        statusCode = 404;
    if (error instanceof ApplicationError.BadRequest)
        statusCode = 400;
    if (error instanceof ApplicationError.Conflict)
        statusCode = 409;
    if (error instanceof ApplicationError.Forbidden)
        statusCode = 403;
    if (error instanceof ApplicationError.InternalServerError)
        statusCode = 500;
    res.status(statusCode || 500);
    let response = {
        timestamp: Date.now(),
        message: error.message,
        status: statusCode,
        exception: error.name,
        path: req.path
    };
    res.json(response);
};


module.exports = ErrorHandler;

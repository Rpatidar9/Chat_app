const notFound = (req, res, next) => {
    const error = new Error(`Not Found ${req.originalUrl}`);
    res.status = 404;
    next(error);
}
const errorHandler = (err, req, res, next) => {

    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
}
module.exports = {
    notFound,
    errorHandler
}
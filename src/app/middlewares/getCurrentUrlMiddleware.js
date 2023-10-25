// render ra admin-header & admin footer nếu bắt đầu = /admin
module.exports = function getCurrentUrlMiddleware(req, res, next) {

    const currentUrl = req.originalUrl;

    res.locals.currentUrl = currentUrl;
    next();
}
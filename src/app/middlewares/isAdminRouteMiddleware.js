// render ra admin-header & admin footer nếu bắt đầu = /admin
module.exports = function isAdminRouteMiddleware(req, res, next) {

    const currentPath = req.originalUrl;

    if (currentPath.startsWith('/admin')) {
        res.locals.isAdminRoute = true;
    } else {
        res.locals.isAdminRoute = false;
    }
    next();
}
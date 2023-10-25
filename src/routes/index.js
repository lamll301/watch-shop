

const siteRouter = require('./site');
const productsRouter = require('./products');
const adminRouter = require('./admin');
const orderRouter = require('./order');
const cartRouter = require('./cart');
const accountRouter = require('./account');
const settingsRouter = require('./settings');

function route(app) {

    app.use('/product', productsRouter);
    app.use('/order', orderRouter);
    app.use('/cart', cartRouter);
    app.use('/auth', accountRouter);
    app.use('/settings', settingsRouter);
    app.use('/admin', adminRouter);
    app.use('/', siteRouter);
    
}

module.exports = route;
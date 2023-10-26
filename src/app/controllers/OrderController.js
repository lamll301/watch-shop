
const Watch = require('../models/Watch');
const Order = require('../models/Order');
const Category = require('../models/Category');
const Account = require('../models/Account');
const { Cart, Product } = require('../models/Cart');
const { multipleMongooseToObj } = require('../../util/mongoose');
const { mongooseToObj } = require('../../util/mongoose');

class OrderController {

    // [GET]    /order/:slug
    show(req, res, next) {
        if (typeof req.session.userIdVariable === 'undefined') {
            res.status(404).json({ message: 'Bạn cần đăng nhập để đặt đơn hàng' });
        }
        else {
            Account.findOne({ _id: req.session.userIdVariable })
                .then(account => {
                    let isLoggedIn = false;
                    if (account.status === 'active') isLoggedIn = true;

                    const urlCurrent = 'http://localhost:3000/prod/' + res.locals.currentUrl;
                    Promise.all([
                        Watch.findOne({ _id: req.params.slug }),
                        Cart.findOne({ account_id: account._id }),
                        Category.find({ type: 'Brands'}),
                        Order.find({ account_id: account._id }),
                    ])
                    .then(([watches, cart, categories_brand, orders]) => {
                        res.render('order/order', {
                            urlCurrent: urlCurrent,
                            account: mongooseToObj(account),
                            isLoggedIn: isLoggedIn,
                            watches: mongooseToObj(watches),
                            cart: mongooseToObj(cart),
                            categories_brand: multipleMongooseToObj(categories_brand),
                            orders: multipleMongooseToObj(orders),
                        }); 
                    })
                    .catch(next);
                })
                .catch(next);
        }
    }

    // [POST]    /order/order-store
    store(req, res, next) {
        const order = new Order(req.body);
        Promise.all([
            order.save(), 
            Cart.updateMany({}, { $set: { products: [] } }),
        ])
        .then(() => res.redirect('/'))
        .catch(error => {
            res.send(error)
        });
        // res.json(req.body);
    }

    // [GET]    /order/products
    showProducts(req, res, next) {
        if (typeof req.session.userIdVariable === 'undefined') {
            res.status(404).json({ message: 'Bạn cần đăng nhập để đặt đơn hàng' });
        }
        else {
            Account.findOne({ _id: req.session.userIdVariable })
                .then(account => {
                    let isLoggedIn = false;
                    if (account.status === 'active') isLoggedIn = true;

                    Promise.all([
                        Cart.findOne({ account_id: account._id }),
                        Category.find({ type: 'Brands'}),
                        Order.find({ account_id: account._id }),
                    ])
                    .then(([cart, categories_brand, orders]) => {
                        res.render('order/order-products', {
                            account: mongooseToObj(account),
                            isLoggedIn: isLoggedIn,
                            cart: mongooseToObj(cart),
                            categories_brand: multipleMongooseToObj(categories_brand),
                            orders: multipleMongooseToObj(orders),
                        }); 
                    })
                    .catch(next);
                })
                .catch(next);
        }
    }
}
  
module.exports = new OrderController();
  
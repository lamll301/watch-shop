
const Watch = require('../models/Watch');
const Account = require('../models/Account');
const Order = require('../models/Order');
const Category = require('../models/Category');
const { Cart, Product } = require('../models/Cart');
const { multipleMongooseToObj } = require('../../util/mongoose');
const { mongooseToObj } = require('../../util/mongoose');

class ProductsController {
    // [GET]    /product/:slug
    show(req, res, next) {
        if (typeof req.session.userIdVariable === 'undefined') {
            Promise.all([
                Watch.findOne({ _id: req.params.slug }),
                Category.find({ type: 'Brands'}),
            ])
            .then(([watches, categories_brand]) => {
                res.render('product', {
                    watches: mongooseToObj(watches),
                    categories_brand: multipleMongooseToObj(categories_brand),
                });
            })
            .catch(next);
        }
        else {
            Account.findOne({ _id: req.session.userIdVariable })
                .then(account => {
                    let isLoggedIn = false;
                    if (account.status === 'active') isLoggedIn = true;
                    Promise.all([
                        Cart.findOne({ account_id: account._id }),
                        Watch.findOne({ _id: req.params.slug }),
                        Category.find({ type: 'Brands'}),
                        Order.find({ account_id: account._id }),
                    ])
                    .then(([cart, watches, categories_brand, orders]) => {
                        res.render('product', {
                            account: mongooseToObj(account),
                            isLoggedIn: isLoggedIn,
                            cart: mongooseToObj(cart),
                            watches: mongooseToObj(watches),
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
  
module.exports = new ProductsController();
  
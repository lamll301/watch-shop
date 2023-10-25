
const Account = require('../models/Account');
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Category = require('../models/Category');
const { Cart, Product } = require('../models/Cart');
// const bcrypt = require('bcrypt');
const { multipleMongooseToObj } = require('../../util/mongoose');
const { mongooseToObj } = require('../../util/mongoose');
class SettingsController {
    show(req, res, next) {
        if (typeof req.session.userIdVariable === 'undefined') {
            res.status(404).json({ message: 'Bạn cần đăng nhập để quản lý tài khoản' });
        }
        else {
            Account.findOne({ _id: req.session.userIdVariable })
                .then(account => {
                    let isLoggedIn = false;
                    if (account.status === 'active') isLoggedIn = true;

                    Promise.all([
                        Cart.findOne({ account_id: account._id }),
                        Order.find({ account_id: account._id }),
                        Customer.findOne({ account_id: account._id }),
                        Category.find({ type: 'Brands'}),
                    ])
                    .then(([cart, orders, customer, categories_brand]) => res.render('settings', {
                        account: mongooseToObj(account),
                        isLoggedIn: isLoggedIn,
                        cart: mongooseToObj(cart),
                        orders: multipleMongooseToObj(orders),
                        customer: mongooseToObj(customer),
                        categories_brand: multipleMongooseToObj(categories_brand),
                    }))
                    .catch(next);
                })
                .catch(next);
        }
    }
    update(req, res, next) {
        Account.findOne({ _id: req.session.userIdVariable })
            .then(account => {
                if (req.body.old_password === account.password && req.body.new_password === req.body.confirm_password) {
                    Account.updateOne({ _id: req.params.id }, { password: req.body.new_password })
                        .then(() => res.redirect('back'))
                        .catch(next);
                }
                else {
                    return res.status(400).send('Mời bạn xem lại dữ liệu.');
                }
            })
            .catch(next);
        // res.json(req.body);
    }
    customer(req, res, next) {
        Promise.all([
            Customer.updateOne({ account_id: req.session.userIdVariable }, req.body),
            Account.updateOne( {_id: req.session.userIdVariable}, { fullname: req.body.fullname } )
        ])
            .then(() => res.redirect('back'))
            .catch(next);
    }
}
  
module.exports = new SettingsController();
  
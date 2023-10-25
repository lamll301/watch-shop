
const { Cart, Product } = require('../models/Cart');
const Account = require('../models/Account');
const Category = require('../models/Category');
const Order = require('../models/Order');

const { multipleMongooseToObj } = require('../../util/mongoose');
const { mongooseToObj } = require('../../util/mongoose');

class CartController {
    // [GET]    /cart
    show(req, res, next) {
        if (typeof req.session.userIdVariable === 'undefined') {
            res.status(404).json({ message: 'Bạn cần đăng nhập để xem giỏ hàng' });
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
                    .then(([cart, categories_brand, orders]) => res.render('cart', {
                        account: mongooseToObj(account),
                        isLoggedIn: isLoggedIn,
                        cart: mongooseToObj(cart),
                        categories_brand: multipleMongooseToObj(categories_brand),
                        orders: multipleMongooseToObj(orders),
                    }))
                    .catch(next);
                })
                .catch(next);
        }
    }

    // [POST]    /cart/store
    store(req, res, next) {
        if (typeof req.session.userIdVariable === 'undefined') {
            res.status(404).json({ message: 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng' });
        }
        else {
            Account.findOne({ _id: req.session.userIdVariable })
                .then(account => {
                    Cart.findOne({ account_id: account._id })
                        .then(cart => {
                            const existingProductIndex = cart.products.findIndex(product => product._id.toString() === req.body._id);
                            if (existingProductIndex !== -1) {
                                // Nếu sản phẩm đã tồn tại, cập nhật số lượng của nó
                                cart.products[existingProductIndex].quantity = parseInt(req.body.quantity);
                            } else {
                                // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào mảng cart.products
                                const newProduct = new Product(req.body);
                                cart.products.push(newProduct);
                            }
                            return cart.save();
                        })
                        .then(() => res.redirect('/cart'))
                        .catch(next);
                })
                .catch(next);
        }
    }

    // [PUT]    /cart/prod/:id
    removeAndUpdateQuantityProduct(req, res, next) {
        let act = req.body.act;
        let updateQuery = {};
        if (act === 'remove') {
            updateQuery = { $pull: { products: { _id: req.params.id } } };
        } else if (act === 'update') {
            updateQuery = { $set: { 'products.$.quantity': req.body.quantity } };
        }
        Account.findOne({ _id: req.session.userIdVariable })
            .then(account => {
                Cart.updateOne(
                    { account_id: account._id, 'products._id': req.params.id },
                    updateQuery,
                )
                .then(() => {
                    return Cart.findOne({ account_id: account._id });
                })
                .then((cart) => {
                    return cart.save();
                })
                .then(() => res.redirect('back'))
                .catch(next);
            })
            .catch(next);
    }
}
  
module.exports = new CartController();
  
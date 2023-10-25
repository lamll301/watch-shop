
const Account = require('../models/Account');
const Customer = require('../models/Customer');
const { Cart, Product } = require('../models/Cart');
// const bcrypt = require('bcrypt');
const { multipleMongooseToObj } = require('../../util/mongoose');
const { mongooseToObj } = require('../../util/mongoose');

class AccountController {
    // [POST]    /login
    login(req, res, next) {
        let loginSuccess = false;
        Account.findOne({ email: req.body.email })
            .then(account => {
                if (!account) {
                    return res.status(404).json({ message: 'Tài khoản không tồn tại' });
                }
                if (req.body.password === account.password) {
                    req.session.userIdVariable = account._id;
                    loginSuccess = true;
                    account.status = 'active';
                    return account.save();
                }
                else {
                    return res.status(401).json({ message: 'Mật khẩu không chính xác' });
                }
            })
            .then(() => {
                if (loginSuccess) {
                    res.redirect('back');
                }
            })
            .catch(next);
    }
    
    // [POST]   /logout
    logout(req, res, next) {
        req.session.userIdVariable = undefined;
        Account.findOne({ _id: req.body._id })
            .then(account => {
                account.status = 'noactive';
                account.save();
                res.redirect('/');
            })
    }

    // [POST]   /register
    store(req, res, next) {
        const account = new Account(req.body);
    
        account.save()
            .then(account => {
                const newCart = new Cart({ account_id: account._id, products: [] });
                const newCustomer = new Customer({ account_id: account._id });
    
                return Promise.all([
                    newCart.save(),
                    newCustomer.save()
                ]);
            })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
}
  
module.exports = new AccountController();
  

const Order = require('../models/Order');
const Watch = require('../models/Watch');

const { multipleMongooseToObj } = require('../../util/mongoose');
const { mongooseToObj } = require('../../util/mongoose');

class AdminOrderController {

    // [GET]    /admin/order-me-store
    storedOrder(req, res, next) {
        Order.find({ status: 'not-approved' })
            .then(orders => res.render('admin/order/stored-order', {
                orders: multipleMongooseToObj(orders)
            }))
            .catch(next);
    }

    // [GET]    /admin/order-me-approved
    approvedOrder(req, res, next) {
        Order.find({ status: 'approved' })
            .then(orders => res.render('admin/order/stored-order', {
                orders: multipleMongooseToObj(orders)
            }))
            .catch(next);
    }

    // [GET]    /admin/order-me-done
    doneOrder(req, res, next) {
        Order.find({ status: 'done' })
            .then(orders => res.render('admin/order/stored-order', {
                orders: multipleMongooseToObj(orders)
            }))
            .catch(next);
    }

    // [GET]    /admin/order-me-canceled
    canceledOrder(req, res, next) {
        Order.find({ status: 'canceled' })
            .then(orders => res.render('admin/order/stored-order', {
                orders: multipleMongooseToObj(orders)
            }))
            .catch(next);
    }

    // [GET]    /admin/order/:id/detail
    detail(req, res, next) {
        Order.findById(req.params.id)
            .then(order => res.render('admin/order/detail', {
                order: mongooseToObj(order),
            }))
            .catch(next);
    }

    // [PUT]    /admin/order/:id/approve
    approve(req, res, next) {
        req.body.status = 'approved';
    
        const arrayUpdatedProducts = [];
        const arrayUpdatedOrders = [];
    
        for (const product of req.body.products) {
            arrayUpdatedProducts.push(
                Watch.findByIdAndUpdate(product._id, { stock_quantity: product.stock_quantity_update }, { new: true })
                    .exec()
            );
    
            arrayUpdatedOrders.push(
                Order.updateMany(
                    { 'products._id': product._id },
                    { $set: { 'products.$.stock_quantity': product.stock_quantity_update } }
                ).exec()
            );
        }
    
        const promisesToUpdateProducts = Promise.all(arrayUpdatedProducts);
        const promisesToUpdateOrders = Promise.all(arrayUpdatedOrders);
    
        Promise.all([
            Order.updateOne({ _id: req.params.id }, { status: req.body.status }),
            promisesToUpdateProducts,
            promisesToUpdateOrders
        ])
        .then(() => {
            res.redirect('back');
        })
        .catch(next);
        // res.json(req.body)
    }

    // [PUT]   /admin/order/:id/done
    done(req, res, next) {
        Order.updateOne({ _id: req.params.id }, { status: 'done' })
            .then(() => res.redirect('back'))
            .catch(next);
    }  

    // [PUT]   /admin/order/:id/canceled
    canceled(req, res, next) {
        req.body.status = 'canceled';
    
        const arrayUpdatedProducts = [];
        const arrayUpdatedOrders = [];
    
        for (const product of req.body.products) {
            arrayUpdatedProducts.push(
                Watch.findByIdAndUpdate(product._id, { stock_quantity: product.stock_quantity_update }, { new: true })
                    .exec()
            );
    
            arrayUpdatedOrders.push(
                Order.updateMany(
                    { 'products._id': product._id },
                    { $set: { 'products.$.stock_quantity': product.stock_quantity_update } }
                ).exec()
            );
        }
    
        const promisesToUpdateProducts = Promise.all(arrayUpdatedProducts);
        const promisesToUpdateOrders = Promise.all(arrayUpdatedOrders);
    
        Promise.all([
            Order.updateOne({ _id: req.params.id }, { status: req.body.status }),
            promisesToUpdateProducts,
            promisesToUpdateOrders
        ])
        .then(() => {
            res.redirect('back');
        })
        .catch(next);
        // res.json(req.body)
    }  

    // [DELETE]   /admin/order/:id  
    destroy(req, res, next) {
        Order.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}
  
module.exports = new AdminOrderController();
  
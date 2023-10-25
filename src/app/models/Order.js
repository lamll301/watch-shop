
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, },
    description: { type: String, },
    manufacturer: { type: String, require: true, },
    old_price: { type: Number, required: true },
    current_price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    pay_price: { type: Number, required: true },
    stock_quantity: { type: Number, require: true, },
});

const Order = new Schema({
    customer_name: { type: String, require: true, },
    customer_number: { type: String, require: true, },
    customer_address: { type: String, require: true, },
    customer_city: { type: String, require: true, },
    customer_district: { type: String, require: true, },
    customer_ward: { type: String, require: true, },
    products: [Product],
    delivery_price: { type: Number, require: true, },
    total_price: { type: Number, require: true, },
    account_id: { type: String },
    status: { type: String, require: true, },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', Order);

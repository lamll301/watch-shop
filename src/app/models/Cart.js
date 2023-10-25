
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, },
    description: { type: String, },
    stock_quantity: { type: Number, require: true, },
    manufacturer: { type: String, require: true, },
    price: { type: Number, required: true },
    discount: { type: Number, min: 0, max: 100 },
    quantity: { type: Number, required: true },
    product_price: { type: Number },
});

const Cart = new Schema({
    products: [Product],
    account_id: { type: String },
    delivery_price: { type: Number },
    total_price: { type: Number },
    products_price: { type: Number },
});

// Trước khi lưu, tính và lưu trữ giá sản phẩm dựa trên số lượng và giá
Product.pre('save', function(next) {
    // làm tròn đến hàng nghìn
    this.product_price = Math.ceil((this.quantity * this.price * (100 - this.discount) / 100) / 1000) * 1000;
    next();
});
Cart.pre('save', function(next) {
    this.products_price = this.products.reduce((total, product) => total + product.product_price, 0);
    next();
});

module.exports = {
    Cart: mongoose.model('Cart', Cart),
    Product: mongoose.model('Product', Product)
};



const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Watch = new Schema({
    name: { type: String, require: true, },
    description: { type: String, },
    image: { type: String, },
    price: { type: Number, require: true, },
    stock_quantity: { type: Number, require: true, },
    manufacturer: { type: String, require: true, },
    discount: { type: Number, min: 0, max: 100 },
    categories_slug: [{ type: String, required: true }],
    price_discount: { type: Number, require: true, },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Watch', Watch);

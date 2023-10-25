const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Customer = new Schema({
    email: { type: String, default: ''},
    phone: { type: String, default: ''},
    fullname: { type: String, default: ''},
    address: { type: String, default: ''},
    gender: { type: String, default: ''},
    date_of_birth: { type: String,},
    
    account_id: { type: String },
    createAt: { type: Date, default: Date.now},
    updateAt: { type: Date, default: Date.now},
    
}, { collection: 'customers' })

Customer.index({ email: 1}) //Nơi đánh index
module.exports = mongoose.model('Customer', Customer)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    email: { type: String, default: ''},
    password: { type: String, default: ''},
    fullname: { type: String, default: ''},
    roles: {type: String, },
    status: { type: String, default: 'noactive'},

    loginAt: { type: Date, default: Date.now},
    logoutAt: { type: Date, default: Date.now},
    action: { type: String, default: 'System'},

}, { collection: 'accounts' })

// Account.index({ first: 1, last: -1 }) Nơi đánh index
module.exports = mongoose.model('Account', Account)
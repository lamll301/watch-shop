
const mongoose = require('mongoose');
// const slug = require('mongoose-slug-generator');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;
mongoose.plugin(slug);

const Category = new Schema({
    name: String,
    slug: { type: String, slug: 'name', unique: true },
    type: { type: String,},
});

module.exports = mongoose.model('Category', Category);

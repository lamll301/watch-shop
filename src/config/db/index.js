
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://root:1234@cluster0.pnngwnu.mongodb.net/watch_shop_dev');
        // await mongoose.connect('mongodb://127.0.0.1/watch_shop_dev');
        console.log('Connect successfully!!!');
    }
    catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
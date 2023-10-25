
const express = require('express');
const router = express.Router();

const orderController = require('../app/controllers/OrderController');

router.post('/store', orderController.store);
router.get('/products', orderController.showProducts);
router.use('/prod/:slug', orderController.show);

module.exports = router;
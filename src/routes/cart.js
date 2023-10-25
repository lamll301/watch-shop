
const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');

router.post('/store', cartController.store);
router.put('/prod/:id', cartController.removeAndUpdateQuantityProduct);
router.get('/', cartController.show);

module.exports = router;
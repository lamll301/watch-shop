
const express = require('express');
const router = express.Router();

const settingsController = require('../app/controllers/SettingsController');

router.put('/customer', settingsController.customer);
router.put('/:id', settingsController.update);
router.get('/', settingsController.show);

module.exports = router;
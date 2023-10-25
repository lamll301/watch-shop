
const express = require('express');
const router = express.Router();

const accountController = require('../app/controllers/AccountController');

router.post('/login', accountController.login);
router.post('/logout', accountController.logout);
router.post('/register', accountController.store);

module.exports = router;
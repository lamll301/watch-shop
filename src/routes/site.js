
const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

// router.use('/contact/:slug', siteController.show);
router.get('/contact', siteController.contact);
router.get('/search', siteController.search);
router.get('/:slug', siteController.show);
router.get('/', siteController.index);

module.exports = router;
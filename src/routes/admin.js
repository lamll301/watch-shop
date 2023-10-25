
const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');
const adminProdController = require('../app/controllers/AdminProdController');
const adminCategoryController = require('../app/controllers/AdminCategoryController');
const adminOrderController = require('../app/controllers/AdminOrderController');


// router.use('/:slug', adminController.show);
router.get('/prod-create', adminProdController.create);     // tạo data để db
router.post('/prod-store', adminProdController.store);      // up lên db
router.get('/prod-me-store', adminProdController.storedProd);   // get từ db
router.get('/prod/:id/edit', adminProdController.edit);     // get form sửa 
router.put('/prod/:id/remove-category', adminProdController.removeCategory);
router.put('/prod/:id/add-category', adminProdController.addCategory);
router.put('/prod/:id', adminProdController.update);        // sửa rồi up lên db
router.delete('/prod/:id', adminProdController.destroy);     // xóa

router.get('/category-create', adminCategoryController.create);
router.post('/category-store', adminCategoryController.store);
router.get('/category-me-store', adminCategoryController.storedCategory);
router.get('/category/:id/edit', adminCategoryController.edit);
router.put('/category/:id', adminCategoryController.update);
router.delete('/category/:id', adminCategoryController.destroy);

router.get('/order-me-store', adminOrderController.storedOrder);
router.get('/order-me-approved', adminOrderController.approvedOrder);
router.get('/order-me-done', adminOrderController.doneOrder);
router.get('/order-me-canceled', adminOrderController.canceledOrder);
router.get('/order/:id/detail', adminOrderController.detail);
router.put('/order/:id/approve', adminOrderController.approve);
router.put('/order/:id/done', adminOrderController.done);
router.put('/order/:id/canceled', adminOrderController.canceled);
router.delete('/order/:id', adminOrderController.destroy);



router.get('/', adminController.index);

module.exports = router;

const Category = require('../models/Category');
const { multipleMongooseToObj } = require('../../util/mongoose');
const { mongooseToObj } = require('../../util/mongoose');

class AdminCategoryController {

    // [GET]    /admin/category-create
    create(req, res, next) {
        res.render('admin/category/create');
    }

    // [POST]    /admin/category-store
    store(req, res, next) {
        const category = new Category(req.body);
        category.save()
            .then(() => res.redirect('/admin/category-me-store'))
            .catch(error => {
                
            });
    }

    // [GET]    /admin/category/:id/edit
    storedCategory(req, res, next) {
        Category.find({})
            .then(categories => res.render('admin/category/stored-category', {
                categories: multipleMongooseToObj(categories)
            }))
            .catch(next);
    }

    // [GET]    /admin/category/:id/edit
    edit(req, res, next) {
        Category.findById(req.params.id)
            .then(category => res.render('admin/category/edit', {
                category: mongooseToObj(category),
            }))
            .catch(next);
    }

    // [PUT]    /admin/category/:id
    update(req, res, next) {
        Category.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/category-me-store'))
            .catch(next);
    }

    // [DELETE]   /admin/category/:id  
    destroy(req, res, next) {
        Category.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}
  
module.exports = new AdminCategoryController();
  
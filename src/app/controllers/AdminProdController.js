
const Watch = require('../models/Watch');
const Category = require('../models/Category');
const { multipleMongooseToObj } = require('../../util/mongoose');
const { mongooseToObj } = require('../../util/mongoose');

class AdminProdController {

    // [GET]    /admin/prod-create
    create(req, res, next) {
        Category.find({})
            .then(categories => res.render('admin/prod/create', {
                categories: multipleMongooseToObj(categories)
            }))
            .catch(next);
    }

    // [POST]    /admin/prod-store
    store(req, res, next) {
        const watch = new Watch(req.body);
        watch.save()
            .then(() => res.redirect('/admin/prod-me-store'))
            .catch(error => {

            });
        // res.json(req.body);
    }

    // [GET]    /admin/prod-me-store
    storedProd(req, res, next) {
        let watchQuery = Watch.find({});
        
        if (req.query.hasOwnProperty('_sort')) {
            watchQuery = watchQuery.sort({
                [req.query.column]: req.query.type
            });
        }

        watchQuery
            .then(watches => res.render('admin/prod/stored-prod', {
                watches: multipleMongooseToObj(watches)
            }))
            .catch(next);
    }

    // [GET]    /admin/prod/:id/edit
    edit(req, res, next) {
        Promise.all([
            Watch.findById(req.params.id),
            Category.find({}),
        ])
        .then(([watch, categories]) => {
            res.render('admin/prod/edit', {
            watch: mongooseToObj(watch),
            categories: multipleMongooseToObj(categories),
            });
        })
        .catch(next);
    }

    // [PUT]    /admin/prod/:id
    update(req, res, next) {
        Watch.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/prod-me-store'))
            .catch(next);
    }

    // [DELETE]   /admin/prod/:id
    destroy(req, res, next) {
        Watch.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PUT]    /admin/prod/:id/remove-category
    removeCategory(req, res, next) {
        Watch.updateOne( {_id: req.params.id}, { $pull: { categories_slug: req.body.categories_slug } }) // $pull: xóa phần tử khỏi mảng >< $push
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PUT]    /admin/prod/:id/add-category
    addCategory(req, res, next) {
        Watch.updateOne( {_id: req.params.id}, { $addToSet: { categories_slug: req.body.categories_slug } }) // $addToSet: chỉ thêm nếu chưa tồn tại
            .then(() => res.redirect('back'))
            .catch(next);
    }
}
  
module.exports = new AdminProdController();
  
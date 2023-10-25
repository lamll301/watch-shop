
const Category = require('../models/Category');
const Watch = require('../models/watch');
const Order = require('../models/Order');
const Account = require('../models/Account');
const { Cart, Product } = require('../models/Cart');
const { mongooseToObj } = require('../../util/mongoose');
const { multipleMongooseToObj } = require('../../util/mongoose');

class SiteController {

    // [GET]    /
    index(req, res, next) {
        if (typeof req.session.userIdVariable === 'undefined') {
            Category.find({ type: 'Brands'})
                .then(categories_brand => res.render('home', {
                    categories_brand: multipleMongooseToObj(categories_brand),
                }))
                .catch(next);
        }
        else {
            Account.findOne({ _id: req.session.userIdVariable })
                .then(account => {
                    let isLoggedIn = false;
                    if (account.status === 'active') isLoggedIn = true;

                    Promise.all([
                        Cart.findOne({ account_id: account._id }),
                        Category.find({ type: 'Brands'}),
                        Order.find({ account_id: account._id }),
                    ])
                    .then(([cart, categories_brand, orders]) => res.render('home', {
                        account: mongooseToObj(account),
                        isLoggedIn: isLoggedIn,
                        cart: mongooseToObj(cart),
                        categories_brand: multipleMongooseToObj(categories_brand),
                        orders: multipleMongooseToObj(orders),
                    }))
                    .catch(next);
                })
                .catch(next);
        }
        // res.json(typeof(userIdVariable))
    }
    // [GET]    /search?key= &page=1
    search(req, res, next) {
        var key = req.query.key;
        var page = req.query.page;
        var sort = req.query.sort === 'asc' ? 1 : -1;
        const PAGE_SIZE = 5;
        if (key && page) {
            page = parseInt(page);
            Watch.countDocuments({ name: { $regex: key, $options: 'i' } })
            .then(total => {
                var totalPages = Math.ceil(total / PAGE_SIZE);
                if (page > totalPages) page = totalPages;
                if (page < 1) page = 1;
                var numberOfSkips = (page - 1) * PAGE_SIZE;
                if (typeof req.session.userIdVariable === 'undefined') {
                    Watch.find({ name: { $regex: key, $options: 'i' } }).sort({ price_discount: sort })
                    .skip(numberOfSkips)
                    .limit(PAGE_SIZE)
                    .then(watches => {
                        Promise.all([
                            Category.find({ type: 'Brands'}),
                        ])
                        .then(([categories_brand]) => {
                            res.render('categories/show', {
                                categories_brand: multipleMongooseToObj(categories_brand),
                                watches: multipleMongooseToObj(watches),
                                total: total,
                                totalPages: totalPages,
                                currentPage: page,
                                keySearch: key,
                            })
                        })
                    })
                }
                else {
                    Account.findOne({ _id: req.session.userIdVariable })
                    .then(account => {
                        const isLoggedIn = account.status === 'active';
                        Watch.find({ name: { $regex: key, $options: 'i' } })
                        .skip(numberOfSkips)
                        .limit(PAGE_SIZE)
                        .then(watches => {
                            Promise.all([
                                Category.find({ type: 'Brands'}),
                                Cart.findOne({ account_id: account._id }),
                                Order.find({ account_id: account._id }),
                            ])
                            .then(([categories_brand, cart, orders]) => {
                                res.render('categories/show', {
                                    categories_brand: multipleMongooseToObj(categories_brand),
                                    cart: mongooseToObj(cart),
                                    orders: multipleMongooseToObj(orders),
                                    account: mongooseToObj(account),
                                    isLoggedIn: isLoggedIn,
                                    watches: multipleMongooseToObj(watches),
                                    total: total,
                                    totalPages: totalPages,
                                    currentPage: page,
                                    keySearch: key,
                                })
                            })
                        })
                    })
                }
            })
            .catch(next);
        }
        else res.redirect('back');
    }

    // [GET]    /contact
    contact(req, res, next) {
        if (typeof req.session.userIdVariable === 'undefined') {
            Category.find({ type: 'Brands'})
                .then(categories_brand => res.render('contact', {
                    categories_brand: multipleMongooseToObj(categories_brand),
                }))
                .catch(next);
        }
        else {
            Account.findOne({ _id: req.session.userIdVariable })
                .then(account => {
                    let isLoggedIn = false;
                    if (account.status === 'active') isLoggedIn = true;

                    Promise.all([
                        Cart.findOne({ account_id: account._id }),
                        Category.find({ type: 'Brands'}),
                        Order.find({ account_id: account._id }), Order.find({ account_id: account._id }),
                    ])
                    .then(([cart, categories_brand, orders]) => res.render('contact', {
                        cart: mongooseToObj(cart),
                        isLoggedIn: isLoggedIn,
                        account: mongooseToObj(account),
                        categories_brand: multipleMongooseToObj(categories_brand),
                        orders: multipleMongooseToObj(orders),
                    }))
                    .catch(next);
                })
                .catch(next);
        }
    }
    // [GET]    /:slug

    show(req, res, next) {
        var page = req.query.page;
        const PAGE_SIZE = 15;
        if (page) {
            page = parseInt(page);
            Watch.countDocuments({categories_slug: req.params.slug})
            .then(total =>{
                var totalPages = Math.ceil(total / PAGE_SIZE);
                if (page > totalPages) page = totalPages;
                if (page < 1) page = 1;
                var numberOfSkips = (page - 1) * PAGE_SIZE;
                if (typeof req.session.userIdVariable === 'undefined') {
                    Watch.find({ categories_slug: req.params.slug })
                    .skip(numberOfSkips)
                    .limit(PAGE_SIZE)
                    .then(watches => {
                        Category.findOne({ slug: req.params.slug }).then(category => {
                            Promise.all([
                                Category.find({ _id: { $ne: category._id }, type: category.type }),
                                Category.find({ type: 'Brands'}),
                            ])
                            .then(([categories, categories_brand]) => {
                                res.render('categories/show', {
                                    categories: multipleMongooseToObj(categories),
                                    categories_brand: multipleMongooseToObj(categories_brand),
                                    category: mongooseToObj(category),
                                    watches: multipleMongooseToObj(watches),
                                    total: total,
                                    totalPages: totalPages,
                                    currentPage: page,
                                });
                            })
                            .catch(next);
                        })
                    })
                }
                else {
                    Account.findOne({ _id: req.session.userIdVariable })
                    .then(account => {
                        const isLoggedIn = account.status === 'active';
                        Watch.find({ categories_slug: req.params.slug })
                        .skip(numberOfSkips)
                        .limit(PAGE_SIZE)
                        .then(watches => {
                            Category.findOne({ slug: req.params.slug }).then(category => {
                                Promise.all([
                                    Cart.findOne({ account_id: account._id }),
                                    Order.find({ account_id: account._id }),
                                    Category.find({ _id: { $ne: category._id }, type: category.type }),
                                    Category.find({ type: 'Brands'}),
                                ])
                                .then(([cart, orders, categories, categories_brand]) => {
                                    res.render('categories/show', {
                                        cart: mongooseToObj(cart),
                                        orders: multipleMongooseToObj(orders),
                                        category: mongooseToObj(category),
                                        categories: multipleMongooseToObj(categories),
                                        categories_brand: multipleMongooseToObj(categories_brand),
                                        watches: multipleMongooseToObj(watches),
                                        account: mongooseToObj(account),
                                        isLoggedIn: isLoggedIn,
                                        total: total,
                                        totalPages: totalPages,
                                        currentPage: page,
                                    })
                                })
                                .catch(next);
                            })
                        })
                    })
                }
            })
        }
    }

    // show(req, res, next) {
    //     var page = req.query.page;
    //     const PAGE_SIZE = 1;
    //     if (typeof req.session.userIdVariable === 'undefined') {
    //         if (page) {
    //             page = parseInt(page);
    //             if (page < 1) page = 1;
    //             var numberOfSkips = (page - 1) * PAGE_SIZE;
                
    //             Category.findOne({ slug: req.params.slug })
    //             .then(category => {
    //                 if (!category) {
    //                     res.status(404).send('404 not found');
    //                 } else {
    //                     Watch.find({ categories_slug: req.params.slug })
    //                         .skip(numberOfSkips)
    //                         .limit(PAGE_SIZE)
    //                         .then(watches => {
    //                             Promise.all([
    //                                 Category.find({ _id: { $ne: category._id }, type: category.type }), // $ne (not equal)
    //                                 Category.find({ type: 'Brands'}),
    //                                 Watch.countDocuments({categories_slug: req.params.slug}).then((total) => { 
    //                                     var totalPages = Math.ceil(total / PAGE_SIZE);
    //                                     return [total, totalPages];
    //                                 }),
                                    
    //                             ])
    //                             .then(([categories, categories_brand, [total, totalPages]]) => {
    //                                 res.render('categories/show', {
    //                                     category: mongooseToObj(category),
    //                                     watches: multipleMongooseToObj(watches),
    //                                     categories: multipleMongooseToObj(categories),
    //                                     categories_brand: multipleMongooseToObj(categories_brand),
    //                                     total: total,
    //                                     totalPages: totalPages,
    //                                     currentPage: page,
    //                                 });
    //                             })
    //                             .catch(next);
    //                         })
    //                         .catch(next);
    //                 }
    //             })
    //             .catch(next);
    
    //         }
    //     }
    //     else {
    //         Account.findOne({ _id: req.session.userIdVariable })
    //             .then(account => {
    //                 let isLoggedIn = false;
    //                 if (account.status === 'active') isLoggedIn = true;
    //                 if (page) {
    //                     page = parseInt(page);
    //                     if (page < 1) page = 1;
    //                     var numberOfSkips = (page - 1) * PAGE_SIZE;
                        
    //                     Category.findOne({ slug: req.params.slug })
    //                     .then(category => {
    //                         if (!category) {
    //                             res.status(404).send('404 not found');
    //                         } else {
    //                             Watch.find({ categories_slug: req.params.slug })
    //                                 .skip(numberOfSkips)
    //                                 .limit(PAGE_SIZE)
    //                                 .then(watches => {
    //                                     Promise.all([
    //                                         Category.find({ _id: { $ne: category._id }, type: category.type }), // $ne (not equal)
    //                                         Category.find({ type: 'Brands'}),
    //                                         Watch.countDocuments({categories_slug: req.params.slug}).then((total) => { 
    //                                             var totalPages = Math.ceil(total / PAGE_SIZE);
    //                                             return [total, totalPages];
    //                                         }),
    //                                         Cart.findOne({ account_id: account._id }),
    //                                         Order.find({ account_id: account._id }),
    //                                     ])
    //                                     .then(([categories, categories_brand, [total, totalPages], cart, orders]) => {
    //                                         res.render('categories/show', {
    //                                             account: mongooseToObj(account),
    //                                             isLoggedIn: isLoggedIn,
    //                                             category: mongooseToObj(category),
    //                                             watches: multipleMongooseToObj(watches),
    //                                             categories: multipleMongooseToObj(categories),
    //                                             categories_brand: multipleMongooseToObj(categories_brand),
    //                                             total: total,
    //                                             totalPages: totalPages,
    //                                             currentPage: page,
    //                                             cart: mongooseToObj(cart),
    //                                             orders: multipleMongooseToObj(orders),
    //                                         });
    //                                     })
    //                                     .catch(next);
    //                                 })
    //                                 .catch(next);
    //                         }
    //                     })
    //                     .catch(next);
            
    //                 }
    //             })
    //             .catch(next);
    //     }

    // }
 
    
}

module.exports = new SiteController;
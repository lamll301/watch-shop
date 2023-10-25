
const Watch = require('../models/watch');
const { multipleMongooseToObj } = require('../../util/mongoose');
const { mongooseToObj } = require('../../util/mongoose');

class AdminController {

    // [GET] /admin
    index(req, res, next) {
      Watch.find({})
        .then(watches => {
            res.render('admin/admin-home', { 
                watches: multipleMongooseToObj(watches), 
            })
        })
        .catch(next);
    }
}
  
module.exports = new AdminController();
  
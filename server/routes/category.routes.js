const CategoryController = require('../controllers/Category/category.controller');
const {adminAuthenticate} = require('../config/middleware.config');


module.exports = (app) => {
    app.get('/api/categories', CategoryController.index);
    app.post('/api/categories', adminAuthenticate, CategoryController.create);
    app.post('/api/categories/update-multiple', CategoryController.updateMultiple);
    app.post('/api/categories/delete-multiple', CategoryController.deleteMultiple);
    app.get('/api/categories/id/:id', CategoryController.showById);
    app.get('/api/categories/:name', CategoryController.show);
    // app.get('/api/categories/category/:category', CategoryController.getByCategoryName);
    app.put('/api/categories/:id', adminAuthenticate, CategoryController.update);
    app.delete('/api/categories/:id', adminAuthenticate, CategoryController.destroy);
}
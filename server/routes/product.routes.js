const ProductController = require('../controllers/Product/product.controller');
const {adminAuthenticate} = require('../config/middleware.config')

const multer = require('multer');
const path = require('path');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './server/uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "-" + file.originalname)
//     }
// })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({ storage });


module.exports = (app) => {
    app.get('/api/products', ProductController.index);
    app.post('/api/products', adminAuthenticate, upload.single('productImage'), ProductController.create);
    app.get('/api/categories/products', ProductController.getWithCatInfo);
    app.get('/api/category/products/:name', ProductController.getByCategoryName);
    app.get('/api/products/:id', ProductController.show);
    app.put('/api/products/:id', adminAuthenticate, ProductController.update);
    app.delete('/api/products/:id', adminAuthenticate, ProductController.destroy);
}
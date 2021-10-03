const CartController = require('../controllers/Cart/cart.controller');
const { userAuthenticate } = require('../config/middleware.config');

module.exports = (app) => {
    app.get('/api/cart', CartController.index);
    // app.post('/api/cart', CartController.create);
    app.get('/api/user/cart/', userAuthenticate, CartController.getCartItems);
    app.post('/api/user/cart/add', userAuthenticate, CartController.addItemToCart);
    app.get('/api/user/remove/item/:id', userAuthenticate, CartController.removeFromCart);
    app.get('/api/cart/:id', userAuthenticate, CartController.show);
    app.put('/api/cart/:id', userAuthenticate, CartController.update);
    app.delete('/api/cart/:id', userAuthenticate, CartController.destroy);
}
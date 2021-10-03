const OrderController = require('../controllers/Order/order.controller');
const AdminOrderController = require('../controllers/Order/adminOrder.controller');
const { userAuthenticate, adminAuthenticate } = require('../config/middleware.config');

module.exports = (app) => {
    app.post('/api/orders/add', userAuthenticate, OrderController.addOrder);
    app.get('/api/orders/getOrder', userAuthenticate, OrderController.getOrder);
    app.get('/api/orders/getOrders', userAuthenticate, OrderController.getOrders);
    app.put('/api/orders/update', adminAuthenticate, AdminOrderController.update);
    app.get('/api/orders/all', adminAuthenticate, AdminOrderController.getCustomerOrders);
}
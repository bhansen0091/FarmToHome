const LogRegController = require('../controllers/Admin/admin.auth.controller'),
    AdminController = require('../controllers/Admin/admin.controller'),
    { adminAuthenticate } = require('../config/middleware.config');

module.exports = (app) => {
    app.post('/api/admin/register', LogRegController.register);
    app.post('/api/admin/login', LogRegController.login);
    app.get('/api/admin', adminAuthenticate, AdminController.index);
    app.get('/api/admin/:id', adminAuthenticate, AdminController.show);
    app.put('/api/admin/:id', adminAuthenticate, AdminController.update);
    app.delete('/api/admin/:id', adminAuthenticate, AdminController.destroy);
    app.post('/api/admin/logout', LogRegController.logout);
}
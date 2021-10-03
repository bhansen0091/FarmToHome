const LogRegController = require('../controllers/User/user.auth.controller'),
    UserController = require('../controllers/User/user.controller'),
    { userAuthenticate } = require('../config/middleware.config');

module.exports = (app) => {
    app.post('/api/users/register', LogRegController.register);
    app.post('/api/users/login', LogRegController.login);
    app.get('/api/users', userAuthenticate, UserController.index);
    app.get('/api/users/logout', userAuthenticate, LogRegController.logout);
    app.get('/api/users/:id', userAuthenticate, UserController.show);
    app.put('/api/users/:id', userAuthenticate, UserController.update);
    app.delete('/api/users/:id', userAuthenticate, UserController.destroy);
}
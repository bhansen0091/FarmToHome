const AddressController = require('../controllers/User/address.controller');
const { userAuthenticate } = require('../config/middleware.config');

module.exports = (app) => {
    app.post('/api/address/create', userAuthenticate, AddressController.addAddress);
    app.get('/api/address/get', userAuthenticate, AddressController.getAddress);
}
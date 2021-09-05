const InitialDataController = require('../controllers/InitialData/initialData.controller');


module.exports = (app) => {
    app.get('/api/initial-data', InitialDataController.getInitialData);
}
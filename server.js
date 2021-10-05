require('dotenv').config();
const path = require('path');

const express = require('express'),
    app = express(),
    port = process.env.PORT,
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    server = app.listen(port, () => console.log(`Listening on ${port}`));

// {credentials:true, origin: 'http://localhost:3000'}

app.use(
    cookieParser(),
    cors({ credentials: true, origin: ['http://localhost:4000', 'http://localhost:3000'] }),
    express.json(),
    express.urlencoded({ "extended": true })
);
app.use('/public', express.static(__dirname + '/server/uploads'))

// app.get('/public', (req, res) => {
//     res.send(__dirname);
// })

// console.log('__dirname ', __dirname);

require('./server/config/database.config');
require('./server/routes/user.routes')(app);
require('./server/routes/admin.routes')(app);
require('./server/routes/product.routes')(app);
require('./server/routes/category.routes')(app);
require('./server/routes/cart.routes')(app);
require('./server/routes/address.routes')(app);
require('./server/routes/order.routes')(app);
require('./server/routes/initialData.routes')(app);
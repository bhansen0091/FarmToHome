const mongoose = require('mongoose')


// mongoose.connect('mongodb://username:password@host:port/database?options...');

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log(`You are now connected to database ${process.env.DB_NAME}.`))
    .catch(err => console.log(`Failed to connect to database ${process.env.DB_NAME}.`, err))

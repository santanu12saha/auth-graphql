const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var connect = (MONGODB_URI, OPTIONS) => {
    mongoose.connect(MONGODB_URI, OPTIONS); 
};

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log("Mongoose default connection is disconnected due to application termination");
        process.exit(0);
    });
});

mongoose.connection
    .once('open', () => console.log('Connected to Mongo instance.'))
    .on('error', error => console.log('Error connecting to Mongo intance: ', error));


module.exports = {
    connect
};
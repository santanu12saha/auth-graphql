const dbConnector = require('./mongoose-db-connector');
const dbUtils = require('./dbUtils');

const URL = process.env.MONGODB_URI;

dbConnector.connect(URL, dbUtils.options);
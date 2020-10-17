const mongoose = require('mongoose');
var user = mongoose.model('user', require('../schema/userSchema'));
module.exports = user;
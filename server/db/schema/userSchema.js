const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const { reject } = require('lodash');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Every user has an email and password.  The password is not stored as
// plain text - see the authentication helpers below.
const userSchema = new Schema({
    email: String,
    password: String
});

// The user's password is never saved in plain text.  Prior to saving the
// user model, we 'salt' and 'hash' the users password.  This is a one way
// procedure that modifies the password - the plain text password cannot be
// derived from the salted + hashed version. See 'comparePassword' to understand
// how this is used.

userSchema.pre('save', function save(next) {
    const user = this;
    if(!user.isModified('password')) { return next(); }

    bcrypt.genSalt(10, (err, salt) => {
        if(err) { return next(err); }
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if(err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

// We need to compare the plain text password (submitted whenever logging in)
// with the salted + hashed version that is sitting in the database.
// 'bcrypt.compare' takes the plain text password and hashes it, then compares
// that hashed password to the one stored in the DB.  Remember that hashing is
// a one way process - the passwords are never compared in plain text form.

userSchema.methods.comparePassword = function comparePassword (candidatePassword, cb = () => {}) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
            if(err) {
                reject(err);
            }
            resolve(isMatch);
            cb(err, isMatch);
        });
    });
};

userSchema.statics.findUserByEmail = function (email) {
    return this.findOne({ email: email.trim().toLowerCase() })
};

userSchema.statics.findUserById = function (id) {
    return this.findById(id);
};

module.exports = userSchema;
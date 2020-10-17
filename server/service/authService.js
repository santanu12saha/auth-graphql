const authDao = require('../dao/authDao');

var signUp = async (authInfo) => {
    try {
        return await authDao.signUp(authInfo);
    } catch (error) {
        throw new Error(error);
    }
};

var signOut = async (authInfo) => {
    try {
        return await authDao.logOut(authInfo);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    signUp,
    signOut
};
/**
 * `jwt`
 * -------------------------------
 */

module.exports.jwt = {
    jwt_secret: process.env.NODE_ENV === 'development' ? 'keyboard cats' : process.env.JWT_SECRET_RMB
};

const jwt = require('jsonwebtoken');
const config = require('../config');

function isAuthenticated(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        res.locals.user = null;
        return next();
    }
    try {
        const decoded = jwt.verify(token, config.jwt);
        req.user = decoded;
        res.locals.user = decoded;
        next();
    } catch (error) {
        res.clearCookie('token');
        res.locals.user = null;
        return next();
    }
  }
  
function isAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).send('Access denied');
    }
    next();
}
module.exports = {isAuthenticated, isAdmin}
const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
    try {
        console.log(req.header);
        next();
    } catch (e) {

    }
}

module.exports = authentication;
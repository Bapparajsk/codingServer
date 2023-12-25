const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
    try {
        console.log()
        const token = req.headers.token;
        req.user = await jwt.verify(token, process.env.YOUR_SECRET_KEY);
        next();
    } catch (e) {
        return  res.status(422).json({
            status: 422,
            message: 'invalid cookie token',
        })
    }
}

module.exports = authentication;
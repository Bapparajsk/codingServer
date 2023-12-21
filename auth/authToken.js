const jwt = require("jsonwebtoken");
const createAuthToken = async (user) => {
    try {
        const payload = {
            _id: user._id,
            username: user.fullName,
        };

        return await jwt.sign(payload, process.env.YOUR_SECRET_KEY, {    // create a jwt token in user id and userName
            expiresIn: '30d'
        });
    } catch (error) {
        console.log('jwt error ', error)
    }
}

module.exports = createAuthToken;
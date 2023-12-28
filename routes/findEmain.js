const router = require('express').Router();
const auth = require('../middleware/authentication');
const database = require("../db/usersDB");
const schema = require("../models/userDetails");

let Users;

const setDatabase = async (req, res, next) => {
    try{
        Users = database.getCurrentConnection().model('user', schema);
        next();
    } catch (error) {
        console.log('database error : ', error);
        res.status(500).json({
            status: 500,
            error: {
                message: 'Internal Server Error',
                details: error.message || 'Something went wrong on the server.',
            },
        });
    }
}

router.post('/', auth, setDatabase, async (req, res) =>{
    try{
        const { email } = req.body;

        if (await Users.findOne({email : email})) {
            return res.status(200).json({
                status: 200,
                message: "user exist"
            })
        }

        return res.status(200).json({
            status: 200,
            message: "user not exist"
        })

    } catch (error) {
        console.log('internal server error', error);
        return res.status(500).json({    // send error response
            status: 500,
            error: {
                message: 'Internal Server Error',
                details: error.message || 'Something went wrong on the server.',
            },
        });
    }
})

module.exports = router;
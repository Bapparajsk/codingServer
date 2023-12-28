const router = require('express').Router();
const database = require("../db/problemsDB");
const schema = require("../models/problemDetails");
const auth = require('../middleware/authentication');

let Problem;

const setDatabase = async (req, res, next) => {
    try{
        Problem = database.getCurrentConnection().model(req.headers.language, schema);
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

router.get('/', setDatabase, auth, async (req, res) => {
    try {
        const data = await Problem.find();
        res.status(200);
        res.json({
            status: 200,
            statusText: "ok",
            data: data
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e.message || 'Internal Server Error');
    }
});

module.exports = router;
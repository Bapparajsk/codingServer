const router = require('express').Router();
const auth = require('../middleware/authentication');
const database = require("../db/problemsDB");
const schema = require("../models/problemDetails");

let Database;

const setDatabase = async (req, res, next) => {
    try{
        Database = database.getCurrentConnection().model(req.params.language, schema);
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

router.get('/:language', setDatabase, auth, async (req, res) => {
    try {
        const { pageSize, page } = req.query;
        const data = await Database.find();

        if(page !== undefined && pageSize !== undefined) {
            if (page === "0" || pageSize === "0" || pageSize > "30") {
                return res.status(426).json({
                    status: 426,
                    statusText: "Upgrade Required",
                    message: "your parameter is not valid, page -> min = 1, pageSize -> min = 1, max = 30"
                });
            }

            if (page === "1") {
                return res.status(200).json({
                    status: 200,
                    statusCode: "ok",
                    totalResults: data.length,
                    data: data.slice(0, pageSize).length
                });
            }

            if ((page - 1) * pageSize < data.length) {
                return res.status(200).json({
                    status: 200,
                    statusCode: "ok",
                    totalResults: data.length,
                    data: data.slice((page - 1) * pageSize, page * pageSize)
                });
            }

            return res.status(426).json({
                status: 426,
                statusCode: "Upgrade Required",
                message: "Maximum Results Reached"
            });
        }

        if (page === undefined && pageSize !== "0" || pageSize > "30") {
            return res.status(200).json({
                status: 200,
                statusCode: "successful",
                data: data.slice(0, pageSize)
            });
        }

        return res.status(426).json({
            status: 426,
            statusCode: "Upgrade Required",
            message: "Maximum Results Reached"
        });

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
});

module.exports = router;
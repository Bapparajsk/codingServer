const router = require('express').Router();
const database = require("../db/problemsDB");
const schema = require("../models/problemDetails");
const multer = require('multer');
const auth = require('../middleware/authentication');

let Model;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const setDatabase = async (req, res, next) => {
    try{
        Model = database.getCurrentConnection().model(req.params.language, schema);
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

// upload a new problem path is --> /problem/:language
router.post('/upload/:language',setDatabase, upload.single('image'), auth , async (req, res) => {
    try {
        const { problemName, problemOptions, problemAnswer } = JSON.parse(req.body.problemDetails);

        const imageData = req.file.buffer;
        const contentType = req.file.mimetype;
        const problem = new Model({
            language: req.params.language,
            problemName: problemName,
            problemOptions: problemOptions,
            problemAnswer: problemAnswer,
            imageData: imageData,
            contentType: contentType,
        });

        await problem.save();
        return res.status(201).json({
            status: 201,
            message: 'Problem added successfully.'
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
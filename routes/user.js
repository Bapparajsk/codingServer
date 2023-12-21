const router = require('express').Router();
const userModel = require('../models/userDetails');
const bcrypt = require('bcryptjs');
const createAuthToken  = require('../auth/authToken');

// path is user register --> /user/register
router.post('/register', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {    // if all variables are valid
            return res.status(400).json({
                status: 400,
                error: {
                    message: 'Bad Request',
                    details: 'Please provide an fullName, email and password for upload.',
                },
            });
        }

        const newUser = new userModel({    // create a new user
            fullName: fullName,
            email: email,
            password: password
        });

        const user = await newUser.save();
        const token = await createAuthToken(user);

        return  res.status(201).json({    // send successful response
            status: 201,
            message: 'new user create Successful...',
            token
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

// path is user login --> /user/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const isExists = await userModel.findOne({email});

        if (!isExists ) {
            return res.status(500).json({    // send error response
                status: 500,
                message: 'invalid credentials',
            });
        }

        if (await bcrypt.compare(password, isExists.password)) {
            const token = await createAuthToken(isExists);
            return  res.status(200).json({    // send successful response
                status: 200,
                message: 'login Successful...',
                token,
                isExists
            });
        } else {
            return res.status(500).json({    // send error response
                status: 500,
                message: 'invalid credentials',
            });
        }
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
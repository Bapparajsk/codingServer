const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');

/* GET home page. */
router.get('/', auth, (req, res, next) => {
    res.send('ok')
});

module.exports = router;

const router = require('express').Router();
const auth = require('../middleware/authentication');
const database = require('../middleware/setDatabase');

// Image retrieval route
router.get('/:language/:id',  async (req, res) => {
    try {
        const Image = await database.setDatabase(req.params.language);
        const imageId = req.params.id;
        const image = await Image.findById(imageId);
        if (!image) {
            return res.status(404).send('Image not found.');
        }
        res.set('Content-Type', image.contentType);
        return res.send(image.imageData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
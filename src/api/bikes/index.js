const getBikes = require('./get-bikes');
const getBikeById = require('./get-bike-by-id');

const { Router } = require('express');

const router = Router();

router.get('/', getBikes);
router.get('/:id', getBikeById);

module.exports = router;

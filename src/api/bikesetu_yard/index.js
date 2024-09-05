const updateStatus = require('./update-bike-status-yard');
const getBikes = require('./get-bikes');

const { Router } = require('express');

const router = Router();

router.post('/update-status/:id', updateStatus);
router.get('/bikes', getBikes);

module.exports = router;

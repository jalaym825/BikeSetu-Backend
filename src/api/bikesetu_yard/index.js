const updateStatus = require('./update-bike-status-yard');

const { Router } = require('express');

const router = Router();

router.post('/update-status/:id', updateStatus);

module.exports = router;

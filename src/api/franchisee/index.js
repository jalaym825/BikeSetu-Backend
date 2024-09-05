const updateStatus = require('./update-bike-status-franchisees');

const { Router } = require('express');

const router = Router();

router.post('/update-status/:id', updateStatus);

module.exports = router;

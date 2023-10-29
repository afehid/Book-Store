const express = require('express');

const router = express.Router();
const paypalCtrl = require('../Controller/paypalController');

router.get('/buy', paypalCtrl.createPayment);

module.exports = router;

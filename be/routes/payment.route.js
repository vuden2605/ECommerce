const paymentController = require('../controllers/payment.controller');
const express = require('express');
const router = express.Router();
router.get('/success',paymentController.handlePayment);
module.exports = router;
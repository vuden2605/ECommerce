const cartController = require('../controllers/cart.controller');
const express = require('express');
const router = express.Router();
router.post('/add', cartController.addToCart);
module.exports = router;
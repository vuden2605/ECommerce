    const cartController = require('../controllers/cart.controller');
const authService = require('../services/auth.service');
const express = require('express');
const router = express.Router();
router.get('/', authService.authentication, authService.authorization("user"), cartController.getCartItems);
router.post('/add', authService.authentication, authService.authorization("user"),cartController.addToCart);
module.exports = router;
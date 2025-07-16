const orderController = require('../controllers/order.controller');
const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service');
router.get("/", authService.authentication, authService.authorization("admin"), orderController.getAllOrders);
router.get("/user", authService.authentication, orderController.getOrdersByUser);
module.exports= router;
const express = require("express");
const router = express.Router();
router.use('/access', require('./access.route'));
router.use('/products', require('./products.route'));
router.use('/', require('./public.route'));
router.use('/categories', require('./categories.route'));
router.use('/cart', require('./cart.route'));
module.exports = router;
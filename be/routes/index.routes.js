const express = require("express");
const router = express.Router();
//router.use('/', require('./public.route'));
router.use('/access', require('./access.route'));
router.use('/products', require('./products.route'));
router.use('/', require('./public.route'));
module.exports = router;
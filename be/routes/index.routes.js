const express = require("express");
const router = express.Router();
//router.use('/', require('./public.route'));
router.use('/access', require('./access.route'));
module.exports = router;
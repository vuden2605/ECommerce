const express = require('express');
const router = express.Router();    
const access = require('../controllers/access.controller.js');
router.post('/login', access.login);
router.post('/register', access.register);
module.exports = router;
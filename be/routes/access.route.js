const express = require('express');
const router = express.Router();    
const access = require('../controllers/access.controller.js');
const authService = require('../services/auth.service');
router.get('/profile', authService.authentication, authService.authorization("user"), access.getUserById);
router.get('/getAllUser',authService.authentication,authService.authorization("admin"), access.getAllUser);
router.post('/login', access.login);
router.post('/register', access.register);
module.exports = router;
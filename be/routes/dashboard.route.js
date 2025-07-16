const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const authService = require('../services/auth.service');
// Route to get dashboard data for admin
router.get('/', authService.authentication, authService.authorization("admin"), dashboardController.getDashboardAdmin);
// Export the router
module.exports = router;
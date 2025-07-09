const invoiceController = require('../controllers/invoice.controller');
const authService = require('../services/auth.service');
const express = require('express');
const router = express.Router();
router.get('/', authService.authentication, authService.authorization("user"), invoiceController.getInvoicesByUser);
router.post('/payCode', authService.authentication, authService.authorization("user"), invoiceController.payBillCod);
module.exports = router;
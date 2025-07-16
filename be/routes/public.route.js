const express = require("express");
const router = express.Router();
const publicController = require("../controllers/public.controller");
const authService = require('../services/auth.service');
router.get("/", publicController.getIndex);
router.get("/admin", publicController.getAdminPage);
module.exports = router;
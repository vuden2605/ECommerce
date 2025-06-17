const express = require("express");
const router = express.Router();
const publicController = require("../controllers/public.controller");
router.get("/", publicController.getIndex);
module.exports = router;
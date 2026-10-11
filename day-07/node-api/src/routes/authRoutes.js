const express = require("express");
const controller = require("../controllers/authController");
const validate = require("../middleware/validate");
const { loginBody } = require("../validators/employeeSchemas");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();
router.post("/login", validate(loginBody), asyncHandler(controller.login));
module.exports = router;

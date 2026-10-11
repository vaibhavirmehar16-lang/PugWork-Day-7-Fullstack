const express = require("express");
const controller = require("../controllers/employeeController");
const validate = require("../middleware/validate");
const { requireAuth } = require("../middleware/auth");
const { employeeBody, listQuery } = require("../validators/employeeSchemas");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();
router.get("/", validate(listQuery, "query"), asyncHandler(controller.list));
router.get("/:id", asyncHandler(controller.get));
router.post("/", requireAuth, validate(employeeBody), asyncHandler(controller.create));
router.put("/:id", requireAuth, validate(employeeBody), asyncHandler(controller.update));
router.delete("/:id", requireAuth, asyncHandler(controller.remove));
module.exports = router;

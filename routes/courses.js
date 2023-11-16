const express = require("express");
const router = express.Router();
const { Course } = require("../models");
const { asyncHandler } = require("../middleware/asyncHandler");

router.get(
  "/courses",
  asyncHandler(async (req, res) => {
    const courses = await Course.findAll({ order: [["createdAt", "DESC"]] });
    res.json({ courses });
  })
);

module.exports = router;

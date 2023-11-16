const express = require("express");
const router = express.Router();
const { User } = require("../models");
const { asyncHandler } = require('../middleware/asyncHandler');
const { authenticateUser } = require("../middleware/auth-user");

router.get(
  "/users",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const user = req.currentUser;

    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      password: user.password,
    });
  })
);

// ITS NOT WORKING. ERROR: "emailAddress must be unique" even when trying to create a unique user
router.post(
  "/users",
  asyncHandler(async (req, res) => {
    try {
      await User.create(req.body);
      res.status(201).json({ message: "Account successfully created!" });
      res.redirect('/');
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

module.exports = router;

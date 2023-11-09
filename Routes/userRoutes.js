const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../Controllers/userControllers");
const validate = require("../Middlewares/validate");
const authenticate = require("../Middlewares/authenticate");
const { check } = require("express-validator");
const router = express.Router();

router.post(
  "/register",
  [
    check("name").not().isEmpty().withMessage("Your name is required"),
    check("email").isEmail().withMessage("Enter a valid email address"),
    check("password")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage("You must type a password at least 6 chars long"),
  ],
  validate,
  registerUser
);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Enter a valid email address"),
    check("password")
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage("You must type a password at least 6 chars long"),
  ],
  validate,
  loginUser
);

router.put("/update/:id", authenticate.User, updateUser);
router.delete("/delete/:id", authenticate.User, deleteUser);

module.exports = router;

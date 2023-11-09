const express = require("express");
const validate = require("../Middlewares/validate");
const authenticate = require("../Middlewares/authenticate");
const { check } = require("express-validator");
const {
  addIncome,
  getIncome,
  updateIncome,
  deleteIncome,
} = require("../Controllers/incomeControllers");
const validateDate = require("../Middlewares/validateDate");
const router = express.Router();

router.post(
  "/:userId/addIncome",
  [
    check("title").notEmpty().withMessage("Title is required"),
    check("amount")
      .isFloat({ gt: 0 })
      .withMessage("Amount must be greater than 0"),
    check("date").custom(validateDate).withMessage("Invalid date format"),
    check("description").notEmpty().withMessage("Description is required"),
    check("source").notEmpty().withMessage("Source is required"),
  ],
  validate,
  authenticate.User,
  addIncome
);

router.get("/:userId/getIncome", authenticate.User, getIncome);

router.put(
  "/:userId/updateIncome/:incomeId",
  [
    check("title").notEmpty().withMessage("Title is required"),
    check("amount")
      .isFloat({ gt: 0 })
      .withMessage("Amount must be greater than 0"),
    check("date").custom(validateDate).withMessage("Invalid date format"),
    check("description").notEmpty().withMessage("Description is required"),
    check("source").notEmpty().withMessage("Source is required"),
  ],
  validate,
  authenticate.User,
  updateIncome
);

router.delete(
  "/:userId/deleteIncome/:incomeId",
  authenticate.User,
  deleteIncome
);

module.exports = router;

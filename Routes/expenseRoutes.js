const express = require("express");
const validate = require("../Middlewares/validate");
const authenticate = require("../Middlewares/authenticate");
const { check } = require("express-validator");
const validateDate = require("../Middlewares/validateDate");
const {
  addExpense,
  deleteExpense,
  updateExpense,
  getExpense,
} = require("../Controllers/expenseControllers");
const router = express.Router();

router.post(
  "/:userId/addExpense",
  [
    check("title").notEmpty().withMessage("Title is required"),
    check("amount")
      .isFloat({ gt: 0 })
      .withMessage("Amount must be greater than 0"),
    check("date").custom(validateDate).withMessage("Invalid date format"),
    check("description").notEmpty().withMessage("Description is required"),
    check("category").notEmpty().withMessage("Category is required"),
  ],
  validate,
  authenticate.User,
  addExpense
);

router.get("/:userId/getExpense", authenticate.User, getExpense);

router.put(
  "/:userId/updateExpense/:expenseId",
  [
    check("title").notEmpty().withMessage("Title is required"),
    check("amount")
      .isFloat({ gt: 0 })
      .withMessage("Amount must be greater than 0"),
    check("date").custom(validateDate).withMessage("Invalid date format"),
    check("description").notEmpty().withMessage("Description is required"),
    check("category").notEmpty().withMessage("Category is required"),
  ],
  validate,
  authenticate.User,
  updateExpense
);

router.delete(
  "/:userId/deleteExpense/:expenseId",
  authenticate.User,
  deleteExpense
);

module.exports = router;

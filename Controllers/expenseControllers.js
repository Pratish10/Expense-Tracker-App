const asyncHandler = require("express-async-handler");
const Expense = require("../Models/expensesSchema");
const moment = require("moment");

const addExpense = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, amount, date, description, category } = req.body;

    const formattedDate = moment(date, "YYYY-MM-DD").toDate();

    const expense = new Expense({
      user: userId,
      title,
      amount,
      date: formattedDate,
      description,
      category,
    });

    const expenseRecords = await expense.save();

    return res.status(200).send(expenseRecords);
  } catch (error) {
    res.status(400).json(error.message);
    console.log("Error adding expense:", error.message);
  }
});

const getExpense = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) return res.status(404).json({ message: "Invalid userId" });

    const expenseRecords = await Expense.find({ user: userId });

    return res.status(200).send(expenseRecords);
  } catch (error) {
    res.status(400).json(error.message);
    console.log("Error getting expense:", error.message);
  }
});

const updateExpense = asyncHandler(async (req, res) => {
  try {
    const { userId, expenseId } = req.params;
    // console.log(userId);
    // console.log(incomeId);
    const { title, amount, date, description, source } = req.body;

    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: expenseId, user: userId },
      { title, amount, date, description, source },
      { new: true }
    );

    if (!updatedExpense)
      return res.status(404).json({ message: "Expense record not found" });

    return res.status(200).send(updatedExpense);
  } catch (error) {
    res.status(400).json(error.message);
    console.log("Error updating expense:", error.message);
  }
});

const deleteExpense = asyncHandler(async (req, res) => {
  try {
    const { userId, expenseId } = req.params;

    const deletedExpense = await Expense.findOneAndDelete({
      _id: expenseId,
      user: userId,
    });

    if (!deletedExpense)
      return res.status(404).json({ message: "Expense record not found" });

    return res
      .status(200)
      .json({ message: "Expense record deleted successfully" });
  } catch (error) {
    res.status(400).json(error.message);
    console.log("Error deleting income:", error.message);
  }
});

module.exports = { addExpense, updateExpense, getExpense, deleteExpense };

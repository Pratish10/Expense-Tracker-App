const asyncHandler = require("express-async-handler");
const Income = require("../Models/incomeSchema");
const moment = require("moment");

const addIncome = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, amount, date, description, source } = req.body;

    const formattedDate = moment(date, "YYYY-MM-DD").toDate();

    const income = new Income({
      user: userId,
      title,
      amount,
      date: formattedDate,
      description,
      source,
    });

    const incomeRecords = await income.save();

    return res.status(200).send(incomeRecords);
  } catch (error) {
    res.status(400).json(error.message);
    console.log("Error adding income:", error.message);
  }
});

const getIncome = asyncHandler(async (req, res) => {
  try {
    // here userId is incomeId
    const { userId } = req.params;

    if (!userId) return res.status(404).json({ message: "Invalid userId" });

    const incomeRecords = await Income.find({ user: userId });

    return res.status(200).send(incomeRecords);
  } catch (error) {
    res.status(400).json(error.message);
    console.log("Error getting income:", error.message);
  }
});

const updateIncome = asyncHandler(async (req, res) => {
  try {
    const { userId, incomeId } = req.params;
    // console.log(userId);
    // console.log(incomeId);
    const { title, amount, date, description, source } = req.body;

    const updatedIncome = await Income.findOneAndUpdate(
      { _id: incomeId, user: userId },
      { title, amount, date, description, source },
      { new: true }
    );

    if (!updatedIncome)
      return res.status(404).json({ message: "Income record not found" });

    return res.status(200).send(updatedIncome);
  } catch (error) {
    res.status(400).json(error.message);
    console.log("Error updating income:", error.message);
  }
});

const deleteIncome = asyncHandler(async (req, res) => {
  try {
    const { userId, incomeId } = req.params;

    const deletedIncome = await Income.findOneAndDelete({
      _id: incomeId,
      user: userId,
    });

    if (!deletedIncome)
      return res.status(404).json({ message: "Income record not found" });

    return res
      .status(200)
      .json({ message: "Income record deleted successfully" });
  } catch (error) {
    res.status(400).json(error.message);
    console.log("Error deleting income:", error.message);
  }
});

module.exports = { addIncome, updateIncome, getIncome, deleteIncome };

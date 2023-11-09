const asyncHandler = require("express-async-handler");
const User = require("../Models/userSchema");
const Income = require("../Models/incomeSchema");
const Expense = require("../Models/expensesSchema");
const generateToken = require("../Middlewares/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res
        .status(401)
        .json({ message: "Error! User already registered" });

    const user = await User.create({
      name,
      email,
      password,
      avatar,
    });

    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(400).json(error.message);
    console.log("Error creating user", error.message);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({
        message: "User does not exists",
      });

    if (user && (await user.comparePassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(400).json(error.message);
    console.log("Error loging user:", error.message);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber, address, city, country, postalCode } =
      req.body;
    const updateData = {
      name,
      email,
      phoneNumber,
      address,
      city,
      country,
      postalCode,
    };
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const responseUser = {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
    };

    return res.status(200).json(responseUser);
  } catch (error) {
    res.status(400).json(error.message);
    console.log("Error updating user:", error.message);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the user's expenses
    await Expense.deleteMany({ user: id });

    // Delete the user's incomes
    await Income.deleteMany({ user: id });

    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser)
      return res.status(404).json({ message: id + "User not found" });

    res.status(200).json({
      message: "User and associated expenses and incomes deleted successfully!",
    });
  } catch (error) {
    res.status(400).json(error.message);
    console.log("Error deleting user:", error.message);
  }
});

module.exports = { registerUser, loginUser, updateUser, deleteUser };

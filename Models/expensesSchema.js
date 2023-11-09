const mongoose = require("mongoose");

const expensesSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "Education",
        "Electronics",
        "Entertainment",
        "Garments",
        "Grocery",
        "Food",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Expenses = mongoose.model("Expenses", expensesSchema);
module.exports = Expenses;

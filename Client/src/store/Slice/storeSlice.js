import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  incomes: [],
  expenses: [],
  error: null,
  loading: false,
};

const storeSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    // users reducer
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.incomes = [];
      state.expenses = [];
      state.error = null;
      state.loading = null;
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      state.user = state.user.filter((user) => user._id !== userId);
    },
    // loading reducer
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // error reducer
    setError: (state, action) => {
      state.error = action.payload;
    },
    // income reducer
    addIncome: (state, action) => {
      state.incomes.push(action.payload);
    },
    deleteIncome: (state, action) => {
      const incomeId = action.payload;
      state.incomes = state.incomes.filter((income) => income._id !== incomeId);
    },
    updateIncome: (state, action) => {
      const newIncome = action.payload;
      const index = state.incomes.findIndex(
        (income) => income._id === newIncome._id
      );
      if (index !== -1) {
        state.incomes[index] = newIncome;
      }
    },
    getIncome: (state, action) => {
      state.incomes = action.payload;
    },
    // expense reducer
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    deleteExpense: (state, action) => {
      const expenseId = action.payload;
      state.expenses = state.expenses.filter(
        (expense) => expense._id !== expenseId
      );
    },
    updateExpense: (state, action) => {
      const newExpense = action.payload;
      const index = state.expenses.findIndex(
        (expense) => expense._id === newExpense._id
      );
      if (index !== -1) {
        state.expenses[index] = newExpense;
      }
    },
    getExpense: (state, action) => {
      state.expenses = action.payload;
    },
  },
});

export const {
  loginUser,
  updateUser,
  logoutUser,
  deleteUser,
  setLoading,
  setError,
  addIncome,
  getIncome,
  deleteIncome,
  updateIncome,
  addExpense,
  getExpense,
  deleteExpense,
  updateExpense,
} = storeSlice.actions;
export default storeSlice.reducer;

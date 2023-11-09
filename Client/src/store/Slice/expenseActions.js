import * as api from "../../Apis/apis";
import {
  addExpense as addExpenseAction,
  getExpense as getExpenseAction,
  updateExpense as updateExpenseAction,
  deleteExpense as deleteExpenseAction,
  setLoading as setLoadingAction,
  setError as setErrorAction,
} from "./storeSlice";

export const addExpense = (userId, expenseData, token) => async (dispatch) => {
  try {
    dispatch(setLoadingAction(true));
    if (!token) throw new Error("Unauthorized access: No token Provided!");
    const addExpense = await api.addExpense(userId, expenseData, token);
    if (!addExpense) {
      dispatch(setErrorAction("Server Error"));
      return false;
    } else {
      const expensedata = addExpense.data;
      dispatch(addExpenseAction(expensedata));
      dispatch(setLoadingAction(false));
      return true;
    }
  } catch (error) {
    console.log("error in addExpense action", error.message);
    dispatch(setLoadingAction(false));
    dispatch(setErrorAction(error.message));
  }
};

export const getExpense = (userId, token) => async (dispatch) => {
  try {
    dispatch(setLoadingAction(true));
    if (!token) throw new Error("Unauthorized access: No token Provided!");
    const getExpense = await api.getExpense(userId, token);
    if (!getExpense) {
      dispatch(setErrorAction("Server Error"));
      return false;
    } else {
      const expensedata = getExpense.data;
      dispatch(getExpenseAction(expensedata));
      dispatch(setLoadingAction(false));
      return true;
    }
  } catch (error) {
    console.log("error in getExpense action", error.message);
    dispatch(setLoadingAction(false));
    dispatch(setErrorAction(error.message));
  }
};

export const updateExpense =
  (userId, expenseId, expenseData, token) => async (dispatch) => {
    try {
      dispatch(setLoadingAction(true));
      console.log(expenseData);
      if (!token) throw new Error("Unauthorized access: No token Provided!");
      const updateExpense = await api.updateExpense(
        userId,
        expenseId,
        expenseData,
        token
      );
      if (!updateExpense) {
        dispatch(setErrorAction("Server Error"));
        return false;
      } else {
        const updateExpenseData = updateExpense.data;
        dispatch(updateExpenseAction(updateExpenseData));
        dispatch(setLoadingAction(false));
        return true;
      }
    } catch (error) {
      console.log("error in updateExpense action", error.message);
      dispatch(setLoadingAction(false));
      dispatch(setErrorAction(error.message));
    }
  };

export const deleteExpense = (userId, expenseId, token) => async (dispatch) => {
  try {
    dispatch(setLoadingAction(true));
    if (!token) throw new Error("Unauthorized access: No token Provided!");
    const deleteExpense = await api.deleteExpense(userId, expenseId, token);
    if (!deleteExpense) {
      dispatch(setErrorAction("Server Error"));
      return false;
    } else {
      dispatch(deleteExpenseAction(expenseId));
      dispatch(setLoadingAction(false));
      return true;
    }
  } catch (error) {
    console.log("error in deleteuser action", error.message);
    dispatch(setLoadingAction(false));
    dispatch(setErrorAction(error.message));
  }
};

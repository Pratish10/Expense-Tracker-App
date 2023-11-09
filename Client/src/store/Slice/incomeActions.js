import * as api from "../../Apis/apis";
import {
  addIncome as addIncomeAction,
  getIncome as getIncomeAction,
  updateIncome as updateIncomeAction,
  deleteIncome as deleteIncomeAction,
  setLoading as setLoadingAction,
  setError as setErrorAction,
} from "./storeSlice";

export const addIncome = (userId, incomeData, token) => async (dispatch) => {
  try {
    dispatch(setLoadingAction(true));
    if (!token) throw new Error("Unauthorized access: No token Provided!");
    const addIncome = await api.addIncome(userId, incomeData, token);
    if (!addIncome) {
      dispatch(setErrorAction("Server Error"));
      return false;
    } else {
      const incomedata = addIncome.data;
      dispatch(addIncomeAction(incomedata));
      dispatch(setLoadingAction(false));
      return true;
    }
  } catch (error) {
    console.log("error in registeruser action", error.message);
    dispatch(setLoadingAction(false));
    dispatch(setErrorAction(error.message));
  }
};

export const getIncome = (userId, token) => async (dispatch) => {
  try {
    dispatch(setLoadingAction(true));
    if (!token) throw new Error("Unauthorized access: No token Provided!");
    const getIncome = await api.getIncome(userId, token);
    if (!getIncome) {
      dispatch(setErrorAction("Server Error"));
      return false;
    } else {
      const incomeData = getIncome.data;
      dispatch(getIncomeAction(incomeData));
      dispatch(setLoadingAction(false));
    }
  } catch (error) {
    console.log("error in loginUser action", error.message);
    dispatch(setLoadingAction(false));
    dispatch(setErrorAction(error.message));
  }
};

export const updateIncome =
  (userId, incomeId, incomeData, token) => async (dispatch) => {
    try {
      dispatch(setLoadingAction(true));
      if (!token) throw new Error("Unauthorized access: No token Provided!");
      const updateIncome = await api.updateIncome(
        userId,
        incomeId,
        incomeData,
        token
      );
      if (!updateIncome) {
        dispatch(setErrorAction("Server Error"));
        return false;
      } else {
        const updateIncomedata = updateIncome.data;
        dispatch(updateIncomeAction(updateIncomedata));
        dispatch(setLoadingAction(false));
      }
    } catch (error) {
      console.log("error in updateuser action", error.message);
      dispatch(setLoadingAction(false));
      dispatch(setErrorAction(error.message));
    }
  };

export const deleteIncome = (userId, incomeId, token) => async (dispatch) => {
  try {
    dispatch(setLoadingAction(true));
    if (!token) throw new Error("Unauthorized access: No token Provided!");
    const deleteIncome = await api.deleteIncome(userId, incomeId, token);
    if (!deleteIncome) {
      dispatch(setErrorAction("Server Error"));
      return false;
    } else {
      dispatch(deleteIncomeAction(incomeId));
      dispatch(setLoadingAction(false));
    }
  } catch (error) {
    console.log("error in deleteuser action", error.message);
    dispatch(setLoadingAction(false));
    dispatch(setErrorAction(error.message));
  }
};

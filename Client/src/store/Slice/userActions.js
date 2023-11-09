import * as api from "../../Apis/apis";
import {
  loginUser as loginUserAction,
  logoutUser as logoutUserAction,
  updateUser as updateUserAction,
  deleteUser as deleteUserAction,
  setLoading as setLoadingAction,
  setError as setErrorAction,
} from "./storeSlice";

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoadingAction(true));
    // console.log("register data user action", userData);
    const registerUser = await api.registerUser(userData);
    // console.log(registerUser);
    if (!registerUser) {
      dispatch(setErrorAction("Server Error"));
      return false;
    } else {
      const registerData = registerUser.data;
      //   console.log(registerData);
      localStorage.setItem("jwtToken", registerData.token);
      dispatch(loginUserAction(registerData));
      dispatch(setLoadingAction(false));
      return true;
    }
  } catch (error) {
    // console.log("error in registeruser action", error.message);
    dispatch(setLoadingAction(false));
    dispatch(setErrorAction(error.message));
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoadingAction(true));
    // console.log("login data user action", userData);
    const loginUser = await api.loginUser(userData);
    if (!loginUser) {
      dispatch(setErrorAction("Server Error"));
      return false;
    } else {
      const loginData = loginUser.data;
      // console.log(loginData);
      localStorage.setItem("jwtToken", loginData.token);
      dispatch(loginUserAction(loginData));
      dispatch(setLoadingAction(false));
      return true;
    }
  } catch (error) {
    // console.log("error in loginUser action", error.message);
    dispatch(setLoadingAction(false));
    dispatch(setErrorAction(error.message));
  }
};

export const updateUser = (userId, updatedData) => async (dispatch) => {
  try {
    dispatch(setLoadingAction(true));
    // console.log(userId, updatedData);
    const token = localStorage.getItem("jwtToken");
    if (!token) throw new Error("Unauthorized access: No token Provided!");
    const user = await api.updateUser(userId, updatedData, token);
    if (!user) {
      dispatch(setErrorAction("Server Error"));
      return false;
    } else {
      const updatedUserData = user.data;
      //   console.log(updatedUserData);
      dispatch(updateUserAction(updatedUserData));
      dispatch(setLoadingAction(false));
      return true;
    }
  } catch (error) {
    // console.log("error in updateuser action", error.message);
    dispatch(setLoadingAction(false));
    dispatch(setErrorAction(error.message));
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch(setLoadingAction(true));
    const token = localStorage.getItem("jwtToken");
    if (!token) throw new Error("Unauthorized access: No token Provided!");
    const user = await api.logout(userId, token);
    if (!user) {
      dispatch(setErrorAction("Server Error"));
      return false;
    } else {
      dispatch(deleteUserAction(userId));
      dispatch(setLoadingAction(false));
      return false;
    }
  } catch (error) {
    // console.log("error in deleteuser action", error.message);
    dispatch(setLoadingAction(false));
    dispatch(setErrorAction(error.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(setLoadingAction(true));
    const token = localStorage.getItem("jwtToken");
    if (token) {
      dispatch(logoutUserAction());
      localStorage.removeItem("jwtToken");
      dispatch(setLoadingAction(false));
      return true;
    } else {
      dispatch(setLoadingAction(false));
      return false;
    }
  } catch (error) {
    // console.log("error in logout action", error.message);
    dispatch(setLoadingAction(false));
    dispatch(setErrorAction(error.message));
  }
};

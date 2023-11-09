import axios from "axios";

// const backendUrl = "https://expense-tracker-app-backend-74ua.onrender.com";
const backendUrl = "http://localhost:8000";

// user urls
export const registerUser = (input) =>
  axios.post(`${backendUrl}/api/user/register`, input);

export const loginUser = (input) =>
  axios.post(`${backendUrl}/api/user/login`, input);

export const updateUser = (id, data, token) =>
  axios.put(`${backendUrl}/api/user/update/${id}`, data, {
    headers: { authorization: `Bearer ${token}` },
  });

export const deleteUser = (id, token) =>
  axios.delete(`${backendUrl}/api/user/delete/${id}`, {
    headers: { authorization: `Bearer ${token}` },
  });

// income urls
export const addIncome = (userId, input, token) =>
  axios.post(`${backendUrl}/api/income/${userId}/addIncome`, input, {
    headers: { authorization: `Bearer ${token}` },
  });

export const getIncome = (userId, token) =>
  axios.get(`${backendUrl}/api/income/${userId}/getIncome`, {
    headers: { authorization: `Bearer ${token}` },
  });

export const updateIncome = (userId, incomeId, incomeData, token) =>
  axios.put(
    `${backendUrl}/api/income/${userId}/updateIncome/${incomeId}`,
    incomeData,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );

export const deleteIncome = (userId, incomeId, token) =>
  axios.delete(`${backendUrl}/api/income/${userId}/deleteIncome/${incomeId}`, {
    headers: { authorization: `Bearer ${token}` },
  });

// expense urls
export const addExpense = (userId, input, token) =>
  axios.post(`${backendUrl}/api/expense/${userId}/addExpense`, input, {
    headers: { authorization: `Bearer ${token}` },
  });

export const getExpense = (userId, token) =>
  axios.get(`${backendUrl}/api/expense/${userId}/getExpense`, {
    headers: { authorization: `Bearer ${token}` },
  });

export const updateExpense = (userId, expenseId, expenseData, token) =>
  axios.put(
    `${backendUrl}/api/expense/${userId}/updateExpense/${expenseId}`,
    expenseData,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );

export const deleteExpense = (userId, expenseId, token) =>
  axios.delete(
    `${backendUrl}/api/expense/${userId}/deleteExpense/${expenseId}`,
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );

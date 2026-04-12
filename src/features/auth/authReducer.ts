import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import loginSlice from "./loginSlice";
import logoutSlice from "./logoutSlice";

export const authReducer = combineReducers({
  auth: authSlice,
  login: loginSlice,
  logout: logoutSlice,
});

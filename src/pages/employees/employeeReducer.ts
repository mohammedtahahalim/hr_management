import { combineReducers } from "@reduxjs/toolkit";
import allEmployeeSlice from "./allEmployeeSlice";

export const employeeReducer = combineReducers({
  allEmployees: allEmployeeSlice,
});

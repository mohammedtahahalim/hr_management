import { combineReducers } from "@reduxjs/toolkit";
import allEmployeeSlice from "./allEmployeeSlice";
import employeeSlice from "./employee/employeeSlice";

export const employeeReducer = combineReducers({
  allEmployees: allEmployeeSlice,
  employee: employeeSlice,
});

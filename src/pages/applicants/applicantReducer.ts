import { combineReducers } from "@reduxjs/toolkit";
import applicantSlice from "./applicantSlice";
import applicantOverview from "./applicantOverview";

export const applicantReducer = combineReducers({
  applicants: applicantSlice,
  applicantOverview: applicantOverview,
});

import { combineReducers } from "@reduxjs/toolkit";
import applicantSlice from "./table/applicantSlice";
import applicantOverview from "./miniStats/applicantOverview";

export const applicantReducer = combineReducers({
  applicants: applicantSlice,
  applicantOverview: applicantOverview,
});

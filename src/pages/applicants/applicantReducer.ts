import { combineReducers } from "@reduxjs/toolkit";
import applicantSlice from "./table/applicantSlice";
import applicantOverview from "./miniStats/applicantOverview";
import detailSlice from "./table/details/detailSlice";

export const applicantReducer = combineReducers({
  applicants: applicantSlice,
  applicantOverview: applicantOverview,
  details: detailSlice,
});

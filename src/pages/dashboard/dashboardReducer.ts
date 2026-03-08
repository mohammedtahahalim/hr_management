import { combineReducers } from "@reduxjs/toolkit";
import candidateSlice from "./candidate/candidateSlice";
import departmentSlice from "./departments/departmentSlice";
import distributionSlice from "./distribution/distributionSlice";
import recentSlice from "./recent/recentSlice";
import activitySlice from "./activity/activitySlice";

export const dashboardReducer = combineReducers({
  candidate: candidateSlice,
  department: departmentSlice,
  distribution: distributionSlice,
  recent: recentSlice,
  activity: activitySlice,
});

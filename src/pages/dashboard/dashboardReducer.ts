import { combineReducers } from "@reduxjs/toolkit";
import candidateSlice from "./candidate/candidateSlice";
import departmentSlice from "./departments/departmentSlice";
import distributionSlice from "./distribution/distributionSlice";
import collectionSlice from "./collection/collectionSlice";
import activitySlice from "./activity/activitySlice";
import recentSlice from "./recent/recentSlice";

export const dashboardReducer = combineReducers({
  candidate: candidateSlice,
  department: departmentSlice,
  distribution: distributionSlice,
  recent: recentSlice,
  collection: collectionSlice,
  activity: activitySlice,
});

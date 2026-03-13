import { combineReducers } from "@reduxjs/toolkit";
import vacancieSlice from "./vacancieSlice";
import addVacancySlice from "./addVacancy/addVacancySlice";

export const vacancyReducer = combineReducers({
  vacancy: vacancieSlice,
  addVacancy: addVacancySlice,
});

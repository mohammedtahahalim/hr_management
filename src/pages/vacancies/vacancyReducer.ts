import { combineReducers } from "@reduxjs/toolkit";
import vacancieSlice from "./vacancieSlice";
import addVacancySlice from "./addVacancy/addVacancySlice";
import vacancySlice from "./vacancy/vacancySlice";

export const vacancyReducer = combineReducers({
  vacancie: vacancieSlice,
  addVacancy: addVacancySlice,
  vacancy: vacancySlice,
});

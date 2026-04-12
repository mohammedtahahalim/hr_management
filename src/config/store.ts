import { configureStore } from "@reduxjs/toolkit";
import toastSlice from "../features/toast/toastSlice";
import notificationSlice from "../features/notifications/notificationSlice";
import { dashboardReducer } from "../pages/dashboard/dashboardReducer";
import { vacancyReducer } from "../pages/vacancies/vacancyReducer";
import { applicantReducer } from "../pages/applicants/applicantReducer";
import { employeeReducer } from "../pages/employees/employeeReducer";
import payrollSlice from "../pages/payroll/payrollSlice";
import overviewSlice from "../pages/overview/overviewSlice";
import { authReducer } from "../features/auth/authReducer";

export const HRStore = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastSlice,
    notifications: notificationSlice,
    dashboard: dashboardReducer,
    vacancies: vacancyReducer,
    applicants: applicantReducer,
    employee: employeeReducer,
    payroll: payrollSlice,
    overview: overviewSlice,
  },
});

export type RootState = ReturnType<typeof HRStore.getState>;
export type AppDispatch = typeof HRStore.dispatch;

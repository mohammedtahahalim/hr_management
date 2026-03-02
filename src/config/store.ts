import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import toastSlice from "../features/toast/toastSlice";
import notificationSlice from "../features/notifications/notificationSlice";
import candidateSlice from "../pages/dashboard/candidate/candidateSlice";
import departmentSlice from "../pages/dashboard/departments/departmentSlice";

export const HRStore = configureStore({
  reducer: {
    auth: authSlice,
    toast: toastSlice,
    notifications: notificationSlice,
    candidate: candidateSlice,
    department: departmentSlice,
  },
});

export type RootState = ReturnType<typeof HRStore.getState>;
export type AppDispatch = typeof HRStore.dispatch;

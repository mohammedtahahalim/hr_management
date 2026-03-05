import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import toastSlice from "../features/toast/toastSlice";
import notificationSlice from "../features/notifications/notificationSlice";
import { dashboardReducer } from "../pages/dashboard/dashboardReducer";

export const HRStore = configureStore({
  reducer: {
    auth: authSlice,
    toast: toastSlice,
    notifications: notificationSlice,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof HRStore.getState>;
export type AppDispatch = typeof HRStore.dispatch;

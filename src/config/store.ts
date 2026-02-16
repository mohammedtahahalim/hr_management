import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import toastSlice from "../features/toast/toastSlice";

export const HRStore = configureStore({
  reducer: {
    auth: authSlice,
    toast: toastSlice,
  },
});

export type RootState = ReturnType<typeof HRStore.getState>;
export type AppDispatch = typeof HRStore.dispatch;

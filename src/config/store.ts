import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";

export const HRStore = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof HRStore.getState>;
export type AppDispatch = typeof HRStore.dispatch;

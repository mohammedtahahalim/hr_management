import type { AlertProps } from "@mui/material";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../../config/store";

interface ToastItem {
  id: string;
  message: string;
  type: Exclude<AlertProps["color"], undefined>;
}

interface ToastShape {
  items: ToastItem[];
}

const initialState: ToastShape = { items: [] };

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<ToastItem>) => {
      state.items.push(action.payload);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
  },
});

export const enqueueToast =
  (toast: Omit<ToastItem, "id">, ttlMs = 7500) =>
  (dispatch: AppDispatch) => {
    const id = nanoid();
    dispatch(addToast({ id, ...toast }));
    const timer = setTimeout(() => {
      dispatch(removeToast(id));
    }, ttlMs);
    return () => clearTimeout(timer);
  };

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;

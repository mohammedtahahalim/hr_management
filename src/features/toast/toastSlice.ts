import type { AlertProps } from "@mui/material";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

/* ----------------------------- State ----------------------------- */
interface ToastItem {
  id: string;
  message: string;
  type: Exclude<AlertProps["color"], undefined>;
  expireAt: number;
}

interface ToastShape {
  items: ToastItem[];
}

const initialState: ToastShape = { items: [] };

/* ----------------------------- Slice ----------------------------- */
export const toastSlice = createSlice({
  name: "toast/slice",
  initialState,
  reducers: {
    addToast: (
      state,
      action: PayloadAction<
        Omit<ToastItem, "id" | "expireAt"> &
          Partial<Pick<ToastItem, "expireAt">>
      >,
    ) => {
      const { message, type, expireAt = 7500 } = action.payload;
      const newToast = {
        id: nanoid(),
        message,
        type,
        expireAt: Date.now() + expireAt,
      };
      state.items.push(newToast);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
  },
});

/* ----------------------------- Export ----------------------------- */
export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;

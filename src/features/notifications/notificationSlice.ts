import {
  createAsyncThunk,
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";
import type { Reject, Status } from "../../shared/lib/types";
import type { RootState } from "../../config/store";

const notificationSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      title: z.record(z.enum(["en", "ar", "ja", "fr"]), z.string()),
      read: z.boolean(),
      readAt: z.string().or(z.null()),
    }),
  ),
});

export type NotificationBackend = z.infer<typeof notificationSchema>;

export type NotificationData = NotificationBackend["data"][number];

interface NotificationState {
  status: Status;
  error: Reject | null;
  data: NotificationData[];
}

export const fetchNotifications = createAsyncThunk<
  NotificationData[],
  void,
  { rejectValue: Reject }
>("notifications/thunk", async (_, { rejectWithValue, signal }) => {
  try {
    const fullURL: string = `${import.meta.env.VITE_API_URL}/api/notifications`;
    const fullOptions: RequestInit = {
      method: "GET",
      credentials: "include",
      signal,
    };
    const response = await fetch(fullURL, fullOptions);
    if (!response.ok) {
      if (response.status === 401) return rejectWithValue("UNAUTHENTICATED");
      if (response.status === 403) return rejectWithValue("FORBIDDEN");
      if (response.status >= 500) return rejectWithValue("BAD");
      return rejectWithValue("SYSTEM");
    }
    const dataFromBackend = await response.json();
    const isValidData = notificationSchema.safeParse(dataFromBackend);
    if (!isValidData.success) return rejectWithValue("MISMATCH");
    const { data } = isValidData.data;
    return data;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return rejectWithValue("ABORT");
    }
    return rejectWithValue("SYSTEM");
  }
});

const initialState: NotificationState = {
  status: "idle",
  error: null,
  data: [],
};

export const selectNotificationStatus = (state: RootState) =>
  state.notifications.status;

export const selectNotificationError = (state: RootState) =>
  state.notifications.error;

export const selectNotifications = (state: RootState) =>
  state.notifications.data;

export const selectNotificationUnread = createSelector(
  [selectNotifications],
  (notifications) => {
    return notifications.filter((n) => n.read).length;
  },
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchNotifications.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.status = "failure";
          state.error = action.payload ?? "SYSTEM";
        },
      )
      .addCase(
        fetchNotifications.fulfilled,
        (state, action: PayloadAction<NotificationData[]>) => {
          state.status = "success";
          state.data = action.payload;
        },
      ),
});

export default notificationSlice.reducer;

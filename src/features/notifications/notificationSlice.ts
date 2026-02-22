import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";

type Status = "idle" | "loading" | "failure" | "succeeded";

export type NError =
  | "SYSTEM"
  | "NETWORK"
  | "DOWN"
  | "FORBIDDEN"
  | "UNAUTHENTICATED"
  | "";

const notificationSchema = z.object({
  title: z.string(),
  read: z.boolean(),
  readAt: z.string().or(z.null()),
});

export type NotificationItem = z.infer<typeof notificationSchema>;

interface NotificationState {
  status: Status;
  error: NError;
  unreadCount: number;
  notifications: NotificationItem[];
}

export const fetchNotifications = createAsyncThunk<
  NotificationItem[],
  void,
  { rejectValue: NError }
>("notifications/thunk", async (_, { rejectWithValue, signal }) => {
  try {
    const fullURL: string = `${import.meta.env.VITE_API_URL}/api/notifications`;
    const fullOptions: RequestInit = {
      method: "GET",
      credentials: "include",
      signal,
    };
    const response = await fetch(fullURL, fullOptions);
    if (!response.ok) throw new Error(response.status.toString());
    const data = await response.json();
    const { notifications } = data;
    return (notifications as NotificationItem[]).filter(
      (n) => notificationSchema.safeParse(n).success,
    );
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return rejectWithValue("NETWORK");
    }
    if (err instanceof Error) {
      if (err.message === "401") return rejectWithValue("UNAUTHENTICATED");
      if (err.message === "403") return rejectWithValue("FORBIDDEN");
      if (err.message === "522") return rejectWithValue("DOWN");
    }
    return rejectWithValue("SYSTEM");
  }
});

export const fetchNotificationsUnreadCount = createAsyncThunk<
  number,
  void,
  { rejectValue: string }
>("unreadCount/thunk", async (_, { signal, rejectWithValue }) => {
  try {
    const fullURL: string = `${import.meta.env.VITE_API_URL}/api/notifications?unread=true`;
    const fullOptions: RequestInit = {
      method: "GET",
      credentials: "include",
      signal,
    };
    const response = await fetch(fullURL, fullOptions);
    if (!response.ok) throw new Error(response.status.toString());
    const data = await response.json();
    const { unreadCount } = data;
    return unreadCount as number;
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue("UNKNOWN");
  }
});

const initialState: NotificationState = {
  status: "idle",
  error: "",
  unreadCount: 0,
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(
        fetchNotifications.rejected,
        (state, action: PayloadAction<NError | undefined>) => {
          state.status = "failure";
          state.error = action.payload ?? "SYSTEM";
        },
      )
      .addCase(
        fetchNotifications.fulfilled,
        (state, action: PayloadAction<NotificationItem[]>) => {
          state.status = "succeeded";
          state.notifications = action.payload;
          state.unreadCount = action.payload.filter((n) => !n.read).length;
        },
      )
      .addCase(
        fetchNotificationsUnreadCount.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.unreadCount = action.payload;
        },
      ),
});

export default notificationSlice.reducer;

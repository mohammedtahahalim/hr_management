import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Reject, Status } from "../../../shared/lib/types";
import z from "zod";
import type { RootState } from "../../../config/store";

const activitySchema = z.object({
  id: z.number().nonnegative(),
  date: z.string().regex(/\d{2}-\d{2}/), // 12 Mar
  title: z.record(z.enum(["en", "ar", "ja", "fr"]), z.string().nonempty()),
  content: z.record(z.enum(["en", "ar", "ja", "fr"]), z.string().nonempty()),
});

export type ActivitiyData = z.infer<typeof activitySchema>;

interface ActivityState {
  status: Status;
  error: Reject | null;
  data: ActivitiyData[];
}

export const fetchActivities = createAsyncThunk<
  ActivitiyData[],
  void,
  { rejectValue: Reject }
>("fetch/activities", async (_, { signal, rejectWithValue }) => {
  try {
    const base = import.meta.env.VITE_API_URL;
    const fullURL: URL = new URL("/api/dashboard", base);
    fullURL.searchParams.set("block", "activity");
    const fullOptions: RequestInit = {
      method: "GET",
      signal,
      credentials: "include",
    };
    const response = await fetch(fullURL, fullOptions);
    if (!response.ok) {
      if (response.status === 401) return rejectWithValue("UNAUTHENTICATED");
      if (response.status === 403) return rejectWithValue("FORBIDDEN");
      if (response.status >= 500) return rejectWithValue("MISMATCH");
      return rejectWithValue("SYSTEM");
    }
    const dataFromServer = (await response.json()) as unknown;
    if (
      !dataFromServer ||
      typeof dataFromServer !== "object" ||
      !("data" in dataFromServer)
    )
      return rejectWithValue("MISMATCH");
    const { data } = dataFromServer;
    if (!Array.isArray(data)) return rejectWithValue("MISMATCH");
    const validData = data.filter((d) => activitySchema.safeParse(d).success);
    return validData as ActivitiyData[];
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError")
      return rejectWithValue("ABORT");

    return rejectWithValue("SYSTEM");
  }
});

const initialState: ActivityState = {
  status: "idle",
  error: null,
  data: [],
};

export const selectActivityStatus = (state: RootState) =>
  state.dashboard.activity.status;

export const selectActivityError = (state: RootState) =>
  state.dashboard.activity.error;

export const selectActivityData = (state: RootState) =>
  state.dashboard.activity.data;

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchActivities.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.status = "failure";
          state.error = action.payload ?? "SYSTEM";
        },
      )
      .addCase(
        fetchActivities.fulfilled,
        (state, action: PayloadAction<ActivitiyData[]>) => {
          state.status = "success";
          state.data = action.payload;
        },
      ),
});

export default activitySlice.reducer;

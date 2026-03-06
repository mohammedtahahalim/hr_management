import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";
import type { Reject, Status } from "../../../shared/lib/types";
import type { RootState } from "../../../config/store";

const activitySchema = z.object({
  id: z.number().nonnegative(),
  time: z.string().nonempty(),
  content: z.record(z.enum(["en", "ja", "ar", "fr"]), z.string()),
});

export type ActivityData = z.infer<typeof activitySchema>;

interface ActivityState {
  status: Status;
  error: Reject | null;
  data: ActivityData[];
}

export const fetchActivities = createAsyncThunk<
  ActivityData[],
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
      if (response.status >= 500) return rejectWithValue("DOWN");
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
    console.log(data);
    const validData = data.filter((d) => activitySchema.safeParse(d).success);
    console.log(validData);
    return validData as ActivityData[];
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return rejectWithValue("ABORT");
    }
    return rejectWithValue("SYSTEM");
  }
});

const initialState: ActivityState = {
  status: "idle",
  error: null,
  data: [],
};

export const activityStatus = (state: RootState) =>
  state.dashboard.activity.status;

export const activityError = (state: RootState) =>
  state.dashboard.activity.error;

export const activityData = (state: RootState) => state.dashboard.activity.data;

const activitySlice = createSlice({
  name: "acitivity",
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
        (state, action: PayloadAction<ActivityData[]>) => {
          state.status = "success";
          state.data = action.payload;
        },
      ),
});

export default activitySlice.reducer;

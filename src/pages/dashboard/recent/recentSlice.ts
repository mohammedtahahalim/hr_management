import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";
import type { Reject, Status } from "../../../shared/lib/types";
import type { RootState } from "../../../config/store";

const recentJobsSchema = z.object({
  id: z.number().nonnegative(),
  jobTitle: z.record(z.enum(["en", "ja", "ar", "fr"]), z.string().nonempty()),
  location: z.string().min(1).max(2),
  totalApps: z.number().nonnegative(),
  trend: z.array(z.number()),
});

export type RecentJobs = z.infer<typeof recentJobsSchema>;

interface RecentJobsState {
  status: Status;
  error: Reject | null;
  data: RecentJobs[];
}

export const fetchRecentJobs = createAsyncThunk<
  RecentJobs[],
  void,
  { rejectValue: Reject }
>("recentJobs", async (_, { signal, rejectWithValue }) => {
  try {
    const base: string = import.meta.env.VITE_API_URL;
    const fullURL: URL = new URL("/api/dashboard", base);
    fullURL.searchParams.set("block", "recent");
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
    const validEntries = data.filter(
      (d) => recentJobsSchema.safeParse(d).success,
    );
    return validEntries as RecentJobs[];
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError")
      return rejectWithValue("ABORT");
    return rejectWithValue("SYSTEM");
  }
});

const initialState: RecentJobsState = {
  status: "idle",
  error: null,
  data: [],
};

export const selectRecentStatus = (state: RootState) =>
  state.dashboard.recent.status;

export const selectRecentError = (state: RootState) =>
  state.dashboard.recent.error;

export const selectRecentData = (state: RootState) =>
  state.dashboard.recent.data;

const recentSlice = createSlice({
  name: "recent/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchRecentJobs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchRecentJobs.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.status = "failure";
          state.error = action.payload ?? "SYSTEM";
        },
      )
      .addCase(
        fetchRecentJobs.fulfilled,
        (state, action: PayloadAction<RecentJobs[]>) => {
          state.status = "success";
          state.data = action.payload;
        },
      ),
});

export default recentSlice.reducer;

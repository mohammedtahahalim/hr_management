import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";
import type { Reject, Status } from "../../shared/lib/types";
import type { RootState } from "../../config/store";

const overviewSchema = z.object({
  data: z.object({}),
});

type FetchOverviewReturn = z.infer<typeof overviewSchema>;

type OverviewData = FetchOverviewReturn["data"];

type FetchOverviewProps = {
  week: string;
};

export const fetchOverview = createAsyncThunk<
  OverviewData,
  FetchOverviewProps,
  { rejectValue: Reject }
>("fetch/overview", async (_args, { signal, rejectWithValue }) => {
  try {
    const { week } = _args;
    const base = import.meta.env.VITE_API_URL;
    const fullURL: URL = new URL("/api/overview", base);
    fullURL.searchParams.set("week", week);
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
    const dataFromBackend = await response.json();
    const isValidData = overviewSchema.safeParse(dataFromBackend);
    if (!isValidData.success) return rejectWithValue("MISMATCH");
    const { data } = isValidData.data;
    return data;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError")
      return rejectWithValue("ABORT");
    return rejectWithValue("SYSTEM");
  }
});

type OverviewState = {
  status: Status;
  error: Reject | null;
  data: OverviewData | null;
};

const initialState: OverviewState = {
  status: "idle",
  error: null,
  data: null,
};

export const selectOverviewStatus = (state: RootState) => state.overview.status;

export const selectOverviewError = (state: RootState) => state.overview.error;

export const selectOverviewData = (state: RootState) => state.overview.data;

const overviewSlice = createSlice({
  name: "overview",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchOverview.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchOverview.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.status = "failure";
          state.error = action.payload ?? "SYSTEM";
        },
      )
      .addCase(
        fetchOverview.fulfilled,
        (state, action: PayloadAction<OverviewData>) => {
          state.status = "success";
          state.data = action.payload;
        },
      ),
});

export default overviewSlice.reducer;

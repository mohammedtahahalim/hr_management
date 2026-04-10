import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Reject, Status } from "../../../shared/lib/types";
import z from "zod";
import { extractCurrentWeek } from "../../../shared/lib/helpers";
import type { RootState } from "../../../config/store";

const distributionSchema = z.object({
  data: z.object({
    total: z.number().nonnegative(),
    distributions: z.array(
      z.object({
        deptName: z.enum([
          "development",
          "sales",
          "management",
          "analytics",
          "finance",
          "data",
          "hr",
        ]),
        percentage: z.number().nonnegative().max(100),
      }),
    ),
  }),
});

export type DistributionBackend = z.infer<typeof distributionSchema>;

export type DistrubtionData = DistributionBackend["data"];

interface DistributionState {
  status: Status;
  error: Reject | null;
  data: DistrubtionData | null;
}

interface DistributionProps {
  week: string;
}

export const fetchDistributions = createAsyncThunk<
  DistrubtionData,
  DistributionProps | void,
  { rejectValue: Reject }
>("distributions/fetch", async (args, { rejectWithValue, signal }) => {
  try {
    const { week } = args ?? { week: extractCurrentWeek() };
    const base = import.meta.env.VITE_API_URL;
    const fullURL = new URL("/api/dashboard", base);
    fullURL.searchParams.set("block", "distribution");
    fullURL.searchParams.set("week", week as string);
    const fullOptions: RequestInit = {
      method: "GET",
      signal,
      credentials: "include",
    };
    const response = await fetch(fullURL, fullOptions);
    if (response.status === 401) return rejectWithValue("UNAUTHENTICATED");
    if (response.status === 403) return rejectWithValue("FORBIDDEN");
    if (response.status >= 500) return rejectWithValue("DOWN");
    const dataFromServer = await response.json();
    const isValidData = distributionSchema.safeParse(dataFromServer);
    if (!isValidData.success) return rejectWithValue("MISMATCH");
    const { data } = isValidData.data;
    return data;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError")
      return rejectWithValue("ABORT");
    return rejectWithValue("SYSTEM");
  }
});

const initialState: DistributionState = {
  status: "idle",
  error: null,
  data: null,
};

const distributionSlice = createSlice({
  name: "dashboard/distribution",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchDistributions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchDistributions.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.status = "failure";
          state.error = action.payload ?? "SYSTEM";
        },
      )
      .addCase(
        fetchDistributions.fulfilled,
        (state, action: PayloadAction<DistrubtionData>) => {
          state.status = "success";
          state.data = action.payload;
        },
      ),
});

export const selectDistributionStatus = (state: RootState) =>
  state.dashboard.distribution.status;

export const selectDistributionError = (state: RootState) =>
  state.dashboard.distribution.error;

export const selectDistributionData = (state: RootState) =>
  state.dashboard.distribution.data;

export const selectTotal = (state: RootState) =>
  state.dashboard.distribution.data?.total;

export const selectDistributions = (state: RootState) =>
  state.dashboard.distribution.data?.distributions;

export default distributionSlice.reducer;

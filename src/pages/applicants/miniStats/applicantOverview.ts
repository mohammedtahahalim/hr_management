import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";
import type { Reject, Status } from "../../../shared/lib/types";
import type { RootState } from "../../../config/store";

const applicantsOverviewSchema = z.object({
  open: z.object({
    total: z.number().nonnegative(),
    trend: z.array(z.number().nonnegative()),
    new: z.number().nonnegative(),
  }),
  active: z.object({
    total: z.number().nonnegative(),
    trend: z.array(z.number().nonnegative()),
    new: z.number().nonnegative(),
  }),
  hiring: z.object({
    average: z.number().nonnegative(),
    trend: z.array(z.number().nonnegative()),
    stages: z.number().nonnegative(),
  }),
  candidate: z.object({
    average: z.number().nonnegative(),
    trend: z.array(z.number().nonnegative()),
    percentage: z.number().nonnegative(),
  }),
});

type ApplicantOverviewData = z.infer<typeof applicantsOverviewSchema>;

export const fetchApplicantsOverview = createAsyncThunk<
  ApplicantOverviewData,
  void,
  { rejectValue: Reject }
>("fetchApplicantsOverview", async (_, { signal, rejectWithValue }) => {
  try {
    const base = import.meta.env.VITE_API_URL;
    const fullURL: URL = new URL("/api/applicants", base);
    fullURL.searchParams.set("block", "overview");
    const fullOptions: RequestInit = {
      method: "GET",
      credentials: "include",
      signal,
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
    const isValidData = applicantsOverviewSchema.safeParse(data);
    if (!isValidData.success) return rejectWithValue("MISMATCH");
    return isValidData.data;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError")
      return rejectWithValue("ABORT");
    return rejectWithValue("SYSTEM");
  }
});

type ApplicantOverviewState = {
  status: Status;
  error: Reject | null;
  data: ApplicantOverviewData | null;
};

const initialState: ApplicantOverviewState = {
  status: "idle",
  error: null,
  data: null,
};

export const selectApplicantOverviewStatus = (state: RootState) =>
  state.applicants.applicantOverview.status;

export const selectApplicantOverviewError = (state: RootState) =>
  state.applicants.applicantOverview.error;

export const selectApplicantOverviewOpen = (state: RootState) =>
  state.applicants.applicantOverview.data?.open;

export const selectApplicantOverviewActive = (state: RootState) =>
  state.applicants.applicantOverview.data?.active;

export const selectApplicantOverviewHiring = (state: RootState) =>
  state.applicants.applicantOverview.data?.hiring;

export const selectApplicantOverviewCandidate = (state: RootState) =>
  state.applicants.applicantOverview.data?.candidate;

const applicantOverviewSlice = createSlice({
  name: "applicants",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchApplicantsOverview.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchApplicantsOverview.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.status = "failure";
          state.error = action.payload ?? "SYSTEM";
        },
      )
      .addCase(
        fetchApplicantsOverview.fulfilled,
        (state, action: PayloadAction<ApplicantOverviewData>) => {
          state.status = "success";
          state.data = action.payload;
        },
      ),
});

export default applicantOverviewSlice.reducer;

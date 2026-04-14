import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";
import type { Reject, Status } from "../../shared/lib/types";
import type { RootState } from "../../config/store";

/* ----------------------------- Schema ----------------------------- */
const overviewSchema = z.object({
  data: z.object({
    overview: z.array(
      z.object({
        name: z.string().nonempty(),
        total: z.number().nonnegative(),
        change: z.number().nonnegative(),
        percentage: z.number().nonnegative(),
      }),
    ),
    application: z.object({
      direct: z.array(z.number()),
      social: z.array(z.number()),
      referral: z.array(z.number()),
    }),
    employment: z.object({
      total: z.number().nonnegative(),
      fullTime: z.number().min(0).max(100),
      partTime: z.number().min(0).max(100),
    }),
    project: z.array(
      z.object({
        name: z.string().nonempty(),
        total: z.number().nonnegative(),
        percentage: z.number().min(1).max(100),
      }),
    ),
    birthday: z.array(
      z.object({
        name: z.record(z.enum(["en", "ar", "fr", "ja"]), z.string().nonempty()),
        profilePicture: z.string().nonempty(),
        position: z.enum([
          "front",
          "backend",
          "design",
          "fullStack",
          "data",
          "c++",
          "php",
          "django",
          "project",
          "devOps",
          "cloud",
        ]),
        year: z.number().min(18),
      }),
    ),
    activity: z.array(
      z.object({
        time: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/),
        location: z.enum([
          "roomA",
          "roomB",
          "roomC",
          "online",
          "training",
          "outdoor",
        ]),
        event: z.record(
          z.enum(["en", "ar", "fr", "ja"]),
          z.string().nonempty(),
        ),
      }),
    ),
  }),
});

/* ----------------------------- State ----------------------------- */
type FetchOverviewReturn = z.infer<typeof overviewSchema>;

type OverviewData = FetchOverviewReturn["data"];

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

/* ----------------------------- Thunks ----------------------------- */
type FetchOverviewProps = {
  date: string;
};

export const fetchOverview = createAsyncThunk<
  OverviewData,
  FetchOverviewProps,
  { rejectValue: Reject }
>("fetch/overview", async (_args, { signal, rejectWithValue }) => {
  try {
    const { date } = _args;
    const base = import.meta.env.VITE_API_URL;
    const fullURL: URL = new URL("/api/overview", base);
    fullURL.searchParams.set("date", date);
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
    const data = await response.json();
    const parsed = overviewSchema.safeParse(data);
    console.log(parsed);
    if (!parsed.success) return rejectWithValue("MISMATCH");
    return parsed.data.data;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError")
      return rejectWithValue("ABORT");
    return rejectWithValue("SYSTEM");
  }
});

/* ----------------------------- Slice ----------------------------- */
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

/* ----------------------------- Selectors ----------------------------- */
export const selectOverviewStatus = (state: RootState) => state.overview.status;

export const selectOverviewError = (state: RootState) => state.overview.error;

export const selectOverviewData = (state: RootState) => state.overview.data;

/* ----------------------------- Exports ----------------------------- */
export default overviewSlice.reducer;

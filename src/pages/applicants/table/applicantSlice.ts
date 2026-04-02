import {
  createAsyncThunk,
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";
import type { Reject, Status } from "../../../shared/lib/types";
import type { RootState } from "../../../config/store";

export type Sorters = "name" | "pos" | "date" | "status" | "contact" | "rating";

const applicantSchema = z.object({
  page: z.number().nonnegative(),
  pageSize: z.number().nonnegative(),
  lastPage: z.number().nonnegative(),
  data: z.array(
    z.object({
      id: z.number().nonnegative(),
      name: z.string().min(2).max(25),
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
      date: z.string().datetime(),
      status: z.number().min(1).max(6),
      email: z.string(),
      rating: z.number().min(0).max(5),
    }),
  ),
});

type ApplicantData = z.infer<typeof applicantSchema>;

export type ApplicantDataSample = ApplicantData["data"][number];

export const fetchApplicants = createAsyncThunk<
  ApplicantData,
  Record<string, number | string>,
  { rejectValue: Reject }
>("fetchApplicants", async (_args, { signal, rejectWithValue }) => {
  try {
    const { page = 1, pageSize = 10 } = _args ?? {};
    const base = import.meta.env.VITE_API_URL;
    const fullURL: URL = new URL("/api/applicants", base);
    fullURL.searchParams.set("page", String(page));
    fullURL.searchParams.set("pageSize", String(pageSize));
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
    const isValid = applicantSchema.safeParse(dataFromServer);
    if (!isValid) return rejectWithValue("MISMATCH");
    return isValid.data as ApplicantData;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError")
      return rejectWithValue("ABORT");
    return rejectWithValue("SYSTEM");
  }
});

type ApplicantState = {
  status: Status;
  error: Reject | null;
  data: ApplicantData | null;
  sortBy: Sorters | null;
  sortOrder: "asc" | "desc" | null;
};

const initialState: ApplicantState = {
  status: "idle",
  error: null,
  data: null,
  sortBy: null,
  sortOrder: null,
};

export const selectApplicantStatus = (state: RootState) =>
  state.applicants.applicants.status;

export const selectApplicantError = (state: RootState) =>
  state.applicants.applicants.error;

export const selectApplicantLastPage = (state: RootState) =>
  state.applicants.applicants.data?.lastPage;

export const selectApplicantData = (state: RootState) =>
  state.applicants.applicants.data?.data;

export const selectApplicantSortBy = (state: RootState) =>
  state.applicants.applicants.sortBy;

export const selectApplicantSortOrder = (state: RootState) =>
  state.applicants.applicants.sortOrder;

const sorters: Record<
  Sorters,
  (a: ApplicantDataSample, b: ApplicantDataSample) => number
> = {
  name: (a, b) => a.name.localeCompare(b.name),
  pos: (a, b) => a.position.localeCompare(b.position),
  date: (a, b) => a.date.localeCompare(b.date),
  status: (a, b) => a.status - b.status,
  contact: (a, b) => a.email.localeCompare(b.email),
  rating: (a, b) => a.rating - b.rating,
};

export const selectDisplayData = createSelector(
  [selectApplicantData, selectApplicantSortBy, selectApplicantSortOrder],
  (data, sortBy, sortOrder) => {
    if (!data || data.length === 0) return [];

    const sortedData = [...data];

    if (sortBy && sortOrder) {
      const comparator = sorters[sortBy];
      sortedData.sort((a, b) =>
        sortOrder === "asc" ? comparator(a, b) : comparator(b, a),
      );
    }

    return sortedData;
  },
);

const applicantSlice = createSlice({
  name: "applicants",
  initialState,
  reducers: {
    sortData: (state, action: PayloadAction<Sorters>) => {
      if (state.sortBy === action.payload) {
        state.sortOrder = state.sortOrder === "desc" ? "asc" : "desc";
      } else {
        state.sortBy = action.payload;
        state.sortOrder = "desc";
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchApplicants.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchApplicants.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.status = "failure";
          state.error = action.payload ?? "SYSTEM";
        },
      )
      .addCase(
        fetchApplicants.fulfilled,
        (state, action: PayloadAction<ApplicantData>) => {
          state.status = "success";
          state.data = action.payload;
        },
      ),
});

export default applicantSlice.reducer;
export const { sortData } = applicantSlice.actions;

import {
  createAsyncThunk,
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";
import type { Reject, Status } from "../../shared/lib/types";
import type { RootState } from "../../config/store";

const payrollSchema = z.object({
  page: z.number().min(1),
  lastPage: z.number().min(1),
  pageSize: z.enum(["8", "12", "16", "20"]),
  data: z.array(
    z.object({
      name: z.record(z.enum(["en", "ja", "ar", "fr"]), z.string().nonempty()),
      email: z.email(),
      profilePic: z.string().or(z.null()),
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
      rateType: z.enum(["f", "h", "d", "w", "m", "y"]),
      period: z.tuple([z.iso.datetime(), z.iso.datetime()]),
      jobType: z.enum(["full", "part", "contract"]),
      salary: z.number().nonnegative(),
      status: z.enum(["progress", "pending", "completed", "rejected"]),
    }),
  ),
});

type FetchPayrollReturn = z.infer<typeof payrollSchema>;

type PayrollData = FetchPayrollReturn["data"][number];

export type PayrollSorters = keyof Omit<PayrollData, "profilePic" | "email">;

const sortersFunc: Record<
  PayrollSorters,
  (a: PayrollData, b: PayrollData) => number
> = {
  name: (a, b) => a.name.en.localeCompare(b.name.en),
  position: (a, b) => a.position.localeCompare(b.position),
  rateType: (a, b) => a.rateType.localeCompare(b.rateType),
  jobType: (a, b) => a.jobType.localeCompare(b.jobType),
  salary: (a, b) => a.salary - b.salary,
  status: (a, b) => a.status.localeCompare(b.status),
  period: (a, b) =>
    new Date(a.period[0]).getTime() - new Date(b.period[0]).getTime(),
};

interface FetchPayrollProps {
  page: number;
  pageSize: number;
}

export const fetchPayrolls = createAsyncThunk<
  FetchPayrollReturn,
  FetchPayrollProps | void,
  { rejectValue: Reject }
>("payrolls/thunk", async (_args, { signal, rejectWithValue }) => {
  try {
    const { page = 1, pageSize = 8 } = _args ?? {};
    const base = import.meta.env.VITE_API_URL;
    const fullURL: URL = new URL("/api/payroll", base);
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
    const dataFromServer = await response.json();
    const isValidData = payrollSchema.safeParse(dataFromServer);
    if (!isValidData.success) return rejectWithValue("MISMATCH");
    return isValidData.data;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError")
      return rejectWithValue("ABORT");
    return rejectWithValue("SYSTEM");
  }
});

interface PayrollState {
  status: Status;
  error: Reject | null;
  pageSize: number;
  lastPage: number | null;
  data: PayrollData[];
  sortBy: PayrollSorters | null;
  sortDirection: "desc" | "asc";
}

const initialState: PayrollState = {
  status: "idle",
  error: null,
  pageSize: 8,
  lastPage: null,
  data: [],
  sortBy: null,
  sortDirection: "desc",
};

export const selectPayrollStatus = (state: RootState) => state.payroll.status;

export const selectPayrollError = (state: RootState) => state.payroll.error;

export const selectPayrollData = (state: RootState) => state.payroll.data;

export const selectPayrollSortBy = (state: RootState) => state.payroll.sortBy;

export const selectPayrollSortDirection = (state: RootState) =>
  state.payroll.sortDirection;

export const selectPayrollLastPage = (state: RootState) =>
  state.payroll.lastPage;

export const payrollDisplayData = createSelector(
  [selectPayrollData, selectPayrollSortBy, selectPayrollSortDirection],
  (data, sortBy, sortDirection) => {
    if (!data.length) return [];
    if (!sortBy) return data;
    const temp = [...data];
    const sort = sortersFunc[sortBy];
    temp.sort((a, b) => (sortDirection === "desc" ? sort(a, b) : sort(b, a)));
    return temp;
  },
);

const payrollSlice = createSlice({
  name: "payroll",
  initialState,
  reducers: {
    changeSorter: (state, action: PayloadAction<PayrollSorters>) => {
      const sortBy = action.payload;
      const sortDir = state.sortDirection;
      if (state.sortBy === sortBy) {
        state.sortDirection = sortDir === "desc" ? "asc" : "desc";
        return;
      }
      state.sortBy = sortBy;
      state.sortDirection = "desc";
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchPayrolls.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchPayrolls.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.status = "failure";
          state.error = action.payload ?? "SYSTEM";
        },
      )
      .addCase(
        fetchPayrolls.fulfilled,
        (state, action: PayloadAction<FetchPayrollReturn>) => {
          const { data, lastPage } = action.payload;
          state.status = "success";
          state.data = data;
          state.lastPage = lastPage;
        },
      ),
});

export default payrollSlice.reducer;
export const { changeSorter } = payrollSlice.actions;

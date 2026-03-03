import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Reject, Status } from "../../../shared/lib/types";
import type { RootState } from "../../../config/store";
import z from "zod";

export const departmentSchema = z.object({
  departmentName: z.enum([
    "development",
    "sales",
    "management",
    "analytics",
    "finance",
    "data",
    "hr",
  ]),
  data: z.array(z.string()),
  newApps: z.number().nonnegative(),
});

export type DepartmentData = z.infer<typeof departmentSchema>;

export type DeptName = DepartmentData["departmentName"];

interface DepartmentState {
  status: Status;
  error: Reject | null;
  data: DepartmentData[];
}

export const fetchDepartments = createAsyncThunk<
  DepartmentData[],
  void,
  { rejectValue: Reject }
>("fetch/departments", async (_, { signal, rejectWithValue }) => {
  try {
    const base = import.meta.env.VITE_API_URL;
    const fullURL = new URL("/api/dashboard", base);
    fullURL.searchParams.set("block", "departments");
    const fullOptions: RequestInit = {
      method: "GET",
      signal,
      credentials: "include",
    };
    const request = await fetch(fullURL, fullOptions);
    if (!request.ok) {
      if (request.status === 401) return rejectWithValue("UNAUTHENTICATED");
      if (request.status === 403) return rejectWithValue("FORBIDDEN");
      if (request.status === 522) return rejectWithValue("DOWN");
      return rejectWithValue("SYSTEM");
    }
    const dataFromServer = (await request.json()) as unknown;
    if (
      dataFromServer === null ||
      typeof dataFromServer !== "object" ||
      !("data" in dataFromServer)
    )
      return rejectWithValue("MISMATCH");
    const { data } = dataFromServer;
    if (!Array.isArray(data)) return rejectWithValue("MISMATCH");
    const filteredData = data.filter(
      (d) => departmentSchema.safeParse(d).success,
    );
    return filteredData as DepartmentData[];
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return rejectWithValue("ABORT");
    }
    return rejectWithValue("SYSTEM");
  }
});

const initialState: DepartmentState = {
  status: "idle",
  error: null,
  data: [],
};

export const selectStatus = (state: RootState) => state.department.status;

export const selectError = (state: RootState) => state.department.error;

export const selectDepartmentData = (state: RootState) => state.department.data;

const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchDepartments.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.status = "failure";
          state.error = action.payload ?? "SYSTEM";
        },
      )
      .addCase(
        fetchDepartments.fulfilled,
        (state, action: PayloadAction<DepartmentData[]>) => {
          state.status = "success";
          state.data = action.payload;
        },
      ),
});

export default departmentSlice.reducer;

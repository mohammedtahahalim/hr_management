import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";
import type { Reject, Status } from "../../shared/lib/types";
import type { RootState } from "../../config/store";

const allEmployeeSchema = z.object({
  page: z.number().min(1),
  pageSize: z.number().min(1),
  lastPage: z.number().min(1),
  data: z.array(
    z.object({
      name: z.string().nonempty(),
      profilePicture: z.string().or(z.null()),
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
      department: z.enum([
        "development",
        "sales",
        "management",
        "analytics",
        "finance",
        "hr",
        "data",
      ]),
      status: z.enum(["active", "remote", "onleave", "terminated"]),
      joinDate: z.iso.datetime(),
      email: z.email(),
      phoneNumber: z.string().regex(/^\+?[\d\s]+$/),
    }),
  ),
});

type DataFromServer = z.infer<typeof allEmployeeSchema>;

type AllEmployeeData = DataFromServer["data"];

interface FetchAllEmployeesArgs {
  page?: string;
}

export const fetchAllEmployees = createAsyncThunk<
  DataFromServer,
  FetchAllEmployeesArgs,
  { rejectValue: Reject }
>("fetch/allEmployees", async (_args, { signal, rejectWithValue }) => {
  try {
    const { page = "1" } = _args ?? {};
    const base: string = import.meta.env.VITE_API_URL;
    const fullURL: URL = new URL("/api/employees", base);
    fullURL.searchParams.set(page, page);
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
    const isValidData = allEmployeeSchema.safeParse(dataFromServer);
    if (!isValidData.success) return rejectWithValue("MISMATCH");
    return isValidData.data;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError")
      return rejectWithValue("ABORT");
    return rejectWithValue("SYSTEM");
  }
});

interface AllEmployeeState {
  status: Status;
  error: Reject | null;
  state: DataFromServer | null;
}

const initialState: AllEmployeeState = {
  status: "idle",
  error: null,
  state: null,
};

export const selectAllEmpoyeeStatus = (state: RootState) =>
  state.employee.allEmployees.status;

export const selectAllEmpoyeeError = (state: RootState) =>
  state.employee.allEmployees.error;

export const selectAllEmpoyeeData = (state: RootState) =>
  state.employee.allEmployees.state?.data;

export const selectEmployeeLastPage = (state: RootState) =>
  state.employee.allEmployees.state?.lastPage;

const allEmployeeSlice = createSlice({
  name: "allEmployees",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllEmployees.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchAllEmployees.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.status = "failure";
          state.error = action.payload ?? "SYSTEM";
        },
      )
      .addCase(
        fetchAllEmployees.fulfilled,
        (state, action: PayloadAction<DataFromServer>) => {
          state.status = "success";
          state.state = action.payload;
        },
      ),
});

export default allEmployeeSlice.reducer;

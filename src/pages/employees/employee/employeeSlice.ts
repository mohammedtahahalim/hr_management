import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";
import type { Reject, Status } from "../../../shared/lib/types";
import type { RootState } from "../../../config/store";

const employeeSchema = z.object({
  data: z.object({}),
});

type ServerData = z.infer<typeof employeeSchema>;

export type EmployeeData = ServerData["data"];

interface FetchArgs {
  id: string;
}

// TODO: Implement submitEmployee edit request, form schema, with react hook form
export const editEmployee = createAsyncThunk("edit/employee", async () => {});

export const fetchEmployee = createAsyncThunk<
  EmployeeData,
  FetchArgs,
  { rejectValue: Reject }
>("fetch/employee", async (_args, { signal, rejectWithValue }) => {
  try {
    const { id } = _args;
    if (typeof id !== "string" || isNaN(Number(id)))
      return rejectWithValue("MISMATCH");
    const base: string = import.meta.env.VITE_API_URL;
    const fullURL: URL = new URL("/api/employees", base);
    fullURL.searchParams.set("id", id);
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
    const isValidData = employeeSchema.safeParse(dataFromServer);
    if (!isValidData.success) return rejectWithValue("MISMATCH");
    const { data } = isValidData.data;
    return data;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return rejectWithValue("ABORT");
    }
    return rejectWithValue("SYSTEM");
  }
});

interface EmployeeState {
  status: Status;
  error: Reject | null;
  data: EmployeeData | null;
}

const initialState: EmployeeState = {
  status: "idle",
  error: null,
  data: null,
};

export const selectEmployeeStatus = (state: RootState) =>
  state.employee.employee.status;

export const selectEmployeeError = (state: RootState) =>
  state.employee.employee.error;

export const selectEmployeeData = (state: RootState) =>
  state.employee.employee.data;

const employeeSlice = createSlice({
  name: "employee/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchEmployee.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchEmployee.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.status = "failure";
          state.error = action.payload ?? "SYSTEM";
        },
      )
      .addCase(
        fetchEmployee.fulfilled,
        (state, action: PayloadAction<EmployeeData>) => {
          state.status = "success";
          state.data = action.payload;
        },
      ),
});

export default employeeSlice.reducer;

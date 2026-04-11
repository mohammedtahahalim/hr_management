import {
  createAsyncThunk,
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";
import type { Reject, Status } from "../../shared/lib/types";
import type { RootState } from "../../config/store";
import type { TLanguage } from "../../config/i18n";

const allEmployeeSchema = z.object({
  page: z.number().min(1),
  pageSize: z.number().min(1),
  lastPage: z.number().min(1),
  data: z.array(
    z.object({
      id: z.number().min(1),
      name: z.record(z.enum(["en", "ja", "ar", "fr"]), z.string().nonempty()),
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
      email: z
        .string()
        .regex(/^[\p{L}\d.+_-]+@(?:[a-zA-Z-]+)(?:\.[a-zA-Z]{2,})+$/u),
      phoneNumber: z.string().regex(/^\+?[\d\s()-]+$/),
    }),
  ),
});

type DataFromServer = z.infer<typeof allEmployeeSchema>;

export type AllEmployeeData = DataFromServer["data"];

export type Employee = AllEmployeeData[number];

export type SortableKeys = {
  [K in keyof Employee]: Employee[K] extends string | Record<TLanguage, string>
    ? K
    : never;
}[keyof Employee];

const sorters: Record<
  SortableKeys,
  (a: Employee, b: Employee, dir: "asc" | "desc") => number
> = {
  name: (a, b, dir) =>
    dir === "asc"
      ? a.name["en"].localeCompare(b.name["en"])
      : b.name["en"].localeCompare(a.name["en"]),
  position: (a, b, dir) =>
    dir === "asc"
      ? a.position.localeCompare(b.position)
      : b.position.localeCompare(a.position),
  department: (a, b, dir) =>
    dir === "asc"
      ? a.department.localeCompare(b.department)
      : b.department.localeCompare(a.department),
  status: (a, b, dir) =>
    dir === "asc"
      ? a.status.localeCompare(b.status)
      : b.status.localeCompare(a.status),
  joinDate: (a, b, dir) =>
    dir === "asc"
      ? new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime()
      : new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime(),
  email: (a, b, dir) =>
    dir === "asc"
      ? a.email.localeCompare(b.email)
      : b.email.localeCompare(a.email),
  phoneNumber: (a, b, dir) =>
    dir === "asc"
      ? a.phoneNumber.localeCompare(b.phoneNumber)
      : b.phoneNumber.localeCompare(a.phoneNumber),
};

interface FetchAllEmployeesArgs {
  page?: number | string;
}

export const fetchAllEmployees = createAsyncThunk<
  DataFromServer,
  FetchAllEmployeesArgs,
  { rejectValue: Reject }
>("fetch/allEmployees", async (_args, { signal, rejectWithValue }) => {
  try {
    const { page = 1 } = _args ?? {};
    const base: string = import.meta.env.VITE_API_URL;
    const fullURL: URL = new URL("/api/employees", base);
    fullURL.searchParams.set("page", String(page));
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
    console.log(isValidData);
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
  viewType: "card" | "list";
  sortBy: SortableKeys | null;
  sortOrder: "asc" | "desc";
}

const initialState: AllEmployeeState = {
  status: "idle",
  error: null,
  state: null,
  viewType: "card",
  sortBy: null,
  sortOrder: "desc",
};

export const selectAllEmployeeStatus = (state: RootState) =>
  state.employee.allEmployees.status;

export const selectAllEmployeeError = (state: RootState) =>
  state.employee.allEmployees.error;

export const selectAllEmployeeData = (state: RootState) =>
  state.employee.allEmployees.state?.data;

export const selectEmployeeLastPage = (state: RootState) =>
  state.employee.allEmployees.state?.lastPage;

export const selectAllEmployeeViewType = (state: RootState) =>
  state.employee.allEmployees.viewType;

export const selectAllEmployeeSortBy = (state: RootState) =>
  state.employee.allEmployees.sortBy;

export const selectAllEmployeeSortOrder = (state: RootState) =>
  state.employee.allEmployees.sortOrder;

export const allEmployeesDisplayData = createSelector(
  [selectAllEmployeeData, selectAllEmployeeSortBy, selectAllEmployeeSortOrder],
  (data, sortBy, sortOrder) => {
    if (!data) return [];
    if (!sortBy) return data;
    const temp = [...data];
    const activeSorter = sorters[sortBy];
    temp.sort((a, b) => activeSorter(a, b, sortOrder));
    return temp;
  },
);

const allEmployeeSlice = createSlice({
  name: "allEmployees",
  initialState,
  reducers: {
    changeViewType: (state) => {
      state.viewType = state.viewType === "card" ? "list" : "card";
    },
    sortAllEmployeeData: (state, action: PayloadAction<SortableKeys>) => {
      const sort = action.payload;
      if (state.sortBy === sort) {
        state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
        return;
      }
      state.sortBy = sort;
      state.sortOrder = "desc";
    },
  },
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
export const { changeViewType, sortAllEmployeeData } = allEmployeeSlice.actions;

import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";
import type { Reject, Status } from "../../../shared/lib/types";
import type { RootState } from "../../../config/store";

const employeeSchema = z.object({
  data: z.object({
    id: z.string(),
    name: z.record(z.enum(["en", "ar", "ja", "fr"]), z.string().nonempty()),
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
    joinDate: z.iso.datetime(),
    email: z
      .string()
      .regex(/^[\p{L}\d.+_-]+@(?:[a-zA-Z-]+)(?:\.[a-zA-Z]{2,})+$/u),
    phoneNumber: z.string().regex(/^\+?[\d\s()-]+$/),
    passport: z.string().regex(/^[a-zA-z0-9\s]+$/),
    passportExp: z.iso.datetime(),
    birthDate: z.string(),
    martial: z.enum(["single", "married", "divorced", "widowed"]),
    bankAcc: z.string().regex(/\d{4}(-|\s|)\d{4}\1\d{4}\1\d{4}/),
    ifscCode: z.string().regex(/[A-Z\d]+/),
    panNb: z.string().nonempty(),
    salaryBasis: z.enum(["hour", "day", "week", "month", "year"]),
    salaryAmount: z.number().nonnegative(),
    lastPayout: z.iso.datetime(),
    payoutType: z.enum(["transfer", "wire", "cash", "check"]),
    billRate: z.number().min(1).max(100),
    experiences: z.array(
      z.object({
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
        company: z.record(
          z.enum(["en", "ar", "ja", "fr"]),
          z.string().nonempty(),
        ),
        tasks: z.array(
          z.record(z.enum(["en", "ar", "ja", "fr"]), z.string().nonempty()),
        ),
        location: z.string().min(1).max(2),
        startDate: z.iso.datetime(),
        endDate: z.iso.datetime().or(z.null()),
      }),
    ),
    education: z.array(
      z.object({
        school: z.record(
          z.enum(["en", "ar", "ja", "fr"]),
          z.string().nonempty(),
        ),
        degree: z.record(
          z.enum(["en", "ar", "ja", "fr"]),
          z.string().nonempty(),
        ),
        graduated: z.string().regex(/^\d{4}$/),
      }),
    ),
    skills: z.array(z.string().nonempty()),
    activeProjects: z.array(
      z.record(
        z.enum(["en", "ar", "ja", "fr"]),
        z.object({
          projTitle: z.string().nonempty(),
          projDesc: z.string().nonempty(),
          deadline: z.iso.datetime(),
          projLeader: z.string().nonempty(),
          progress: z.number().min(0).max(100),
        }),
      ),
    ),
  }),
});

type ServerData = z.infer<typeof employeeSchema>;

export type EmployeeData = ServerData["data"];

interface FetchArgs {
  id: string;
}

// TODO: Implement submitEmployee edit request, form schema, with react hook form
export const editEmployee = createAsyncThunk("edit/employee", async () => {
  console.log("Saving");
});

export const fetchEmployee = createAsyncThunk<
  EmployeeData,
  FetchArgs,
  { rejectValue: Reject }
>("fetch/employee", async (_args, { signal, rejectWithValue }) => {
  try {
    const { id } = _args;
    if (typeof id !== "string" || isNaN(Number(id)))
      return rejectWithValue("BAD");
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
      if (response.status === 400) return rejectWithValue("BAD");
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

export const selectEmployeeName = (state: RootState) => {
  const data = state.employee.employee.data;
  if (!data) return null;
  return data.name;
};

export const selectEmployeePersonalInfo = (state: RootState) => {
  const data = state.employee.employee.data;
  if (!data) return null;
  const { name, position, department, joinDate, email, phoneNumber } = data;
  return { name, position, department, joinDate, email, phoneNumber };
};

export const selectEmployeePrivateInfo = (state: RootState) => {
  const data = state.employee.employee.data;
  if (!data) return null;
  const { passport, passportExp, phoneNumber, birthDate, martial } = data;
  return { passport, passportExp, phoneNumber, birthDate, martial };
};

export const selectEmployeeSkills = (state: RootState) =>
  state.employee.employee.data?.skills;

export const selectEmployeeActiveProjects = (state: RootState) =>
  state.employee.employee.data?.activeProjects;

export const selectEmployeePayRollInfo = (state: RootState) => {
  const data = state.employee.employee.data;
  if (!data) return null;
  const {
    bankAcc,
    ifscCode,
    panNb,
    salaryBasis,
    salaryAmount,
    lastPayout,
    payoutType,
    billRate,
  } = data;
  return {
    bankAcc,
    ifscCode,
    panNb,
    salaryBasis,
    salaryAmount,
    lastPayout,
    payoutType,
    billRate,
  };
};

export const selectEmployeeExerience = (state: RootState) =>
  state.employee.employee.data?.experiences;

export const selectEmployeeEducation = (state: RootState) =>
  state.employee.employee.data?.education;

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

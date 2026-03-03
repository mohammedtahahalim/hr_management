import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Status } from "../../../shared/lib/types";
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
  error: string;
  data: DepartmentData[];
}

export const fetchDepartments = createAsyncThunk(
  "fetch/departments",
  async () => {},
);

const initialState: DepartmentState = {
  status: "idle",
  error: "",
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
        state.error = "";
      })
      .addCase(fetchDepartments.rejected, () => {})
      .addCase(fetchDepartments.fulfilled, () => {}),
});

export default departmentSlice.reducer;

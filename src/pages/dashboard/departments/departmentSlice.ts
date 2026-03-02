import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Status } from "../../../shared/lib/types";
import type { RootState } from "../../../config/store";

interface DepartmentState {
  status: Status;
  error: string;
  data: [];
}

export const fetchDepartments = createAsyncThunk(
  "fetch/departments",
  async () => {},
);

const initialState: DepartmentState = {
  status: "loading",
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
      .addCase(fetchDepartments.pending, () => {})
      .addCase(fetchDepartments.rejected, () => {})
      .addCase(fetchDepartments.fulfilled, () => {}),
});

export default departmentSlice.reducer;

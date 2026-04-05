import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPayrolls = createAsyncThunk("payrolls/thunk", async () => {});

const payrollSlice = createSlice({
  name: "payroll",
  initialState: {},
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchPayrolls.pending, () => {})
      .addCase(fetchPayrolls.rejected, () => {})
      .addCase(fetchPayrolls.fulfilled, () => {}),
});

export default payrollSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchApplicants = createAsyncThunk(
  "fetchApplicants",
  async () => {},
);

const applicantSlice = createSlice({
  name: "applicants",
  initialState: {},
  reducers: {},
});

export default applicantSlice.reducer;

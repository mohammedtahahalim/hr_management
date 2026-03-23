import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchApplicantsOverview = createAsyncThunk(
  "fetchApplicantsOverview",
  async () => {},
);

const applicantOverviewSlice = createSlice({
  name: "applicants",
  initialState: {},
  reducers: {},
});

export default applicantOverviewSlice.reducer;

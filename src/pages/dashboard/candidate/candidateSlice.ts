import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCandidates = createAsyncThunk(
  "candidate/slice",
  async () => {},
);

const candidateSlice = createSlice({
  name: "candidate/slice",
  initialState: {},
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCandidates.pending, () => {})
      .addCase(fetchCandidates.rejected, () => {})
      .addCase(fetchCandidates.fulfilled, () => {}),
});

export default candidateSlice.reducer;

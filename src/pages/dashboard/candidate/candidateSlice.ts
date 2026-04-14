import {
  createAsyncThunk,
  createSlice,
  createSelector,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";
import type { Reject, Status } from "../../../shared/lib/types";
import type { RootState } from "../../../config/store";

/* ----------------------------- Schema ----------------------------- */
const candidateSchema = z.object({
  data: z.array(
    z.object({
      id: z.number().nonnegative(),
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
      offerState: z.enum(["OFFER", "SHORTLIST", "REJECT", "PENDING"]),
    }),
  ),
});

/* ----------------------------- State ----------------------------- */
export type CandidateBackend = z.infer<typeof candidateSchema>;

export type ICandidat = CandidateBackend["data"][number];

interface CandidateState {
  status: Status;
  error: Reject | null;
  data: ICandidat[];
}

const initialState: CandidateState = {
  status: "idle",
  error: null,
  data: [],
};

/* ----------------------------- Thunks ----------------------------- */
export const fetchCandidates = createAsyncThunk<
  ICandidat[],
  void,
  { rejectValue: Reject }
>("candidate/slice", async (_, { signal, rejectWithValue }) => {
  try {
    const fullURL: string = `${import.meta.env.VITE_API_URL}/api/dashboard?block=candidate`;
    const fullOptions: RequestInit = {
      method: "GET",
      credentials: "include",
      signal,
    };
    const response = await fetch(fullURL, fullOptions);
    if (!response.ok) {
      if (response.status === 401) return rejectWithValue("UNAUTHENTICATED");
      if (response.status === 403) return rejectWithValue("FORBIDDEN");
      if (response.status >= 500) return rejectWithValue("DOWN");
      return rejectWithValue("SYSTEM");
    }
    const dataFromBackend = await response.json();
    const isValidData = candidateSchema.safeParse(dataFromBackend);
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

/* ----------------------------- Slice ----------------------------- */
const candidateSlice = createSlice({
  name: "candidate/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchCandidates.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.status = "failure";
          state.error = action.payload ?? "SYSTEM";
        },
      )
      .addCase(
        fetchCandidates.fulfilled,
        (state, action: PayloadAction<ICandidat[]>) => {
          state.status = "success";
          state.data = action.payload;
        },
      ),
});

/* ----------------------------- Selectors ----------------------------- */
export const selectAllCandidates = (state: RootState) =>
  state.dashboard.candidate.data;

export const selectCandidateStatus = (state: RootState) =>
  state.dashboard.candidate.status;

export const selectCandidateError = (state: RootState) =>
  state.dashboard.candidate.error;

export const selectAcceptedCandidates = createSelector(
  [selectAllCandidates],
  (data) => data.filter((c) => c.offerState === "OFFER"),
);

export const selectRejectedCandidates = createSelector(
  [selectAllCandidates],
  (data) => data.filter((c) => c.offerState === "REJECT"),
);

export const selectShortlistedCandidates = createSelector(
  [selectAllCandidates],
  (data) => data.filter((c) => c.offerState === "SHORTLIST"),
);

export const selectPendingCandidates = createSelector(
  [selectAllCandidates],
  (data) => data.filter((c) => c.offerState === "PENDING"),
);

/* ----------------------------- Exports ----------------------------- */
export default candidateSlice.reducer;

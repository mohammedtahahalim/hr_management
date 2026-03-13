import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";
import type { Reject, Status } from "../../../shared/lib/types";
import type { RootState } from "../../../config/store";

const newVacancySchema = z.object({
  job: z.object({
    title: z.string().nonempty(),
    dept: z.enum([
      "frontend",
      "backend",
      "fullStack",
      "devOps",
      "cloud",
      "data",
      "qa",
      "mobile",
      "ml",
      "site",
    ]),
    desc: z.string().nonempty(),
    empType: z.enum(["f", "p", "c", "fl", "r"]),
    location: z.string().min(1).max(2),
    salary: z.number().nonnegative(),
    status: z.enum(["open", "completed", "inprogress"]),
    openDate: z.string().datetime(),
    closeDate: z.string().datetime(),
    minWorkExp: z.number().nonnegative(),
    minEducation: z.enum(["1", "3", "5", "7"]),
    suitableFor: z.enum(["student", "vet", "disabled", "all"]),
    responsiblities: z.string().nonempty(),
    duties: z.string().nonempty(),
  }),
  hirer: z.object({
    name: z.string(),
    phone: z.string().regex(/\d{3}(-|\s|)\d{3}\1\d{4}/),
    additional: z.string(),
    showContact: z.boolean(),
  }),
});

export type NewVacancyData = z.infer<typeof newVacancySchema>;

export const addNewVacancy = createAsyncThunk<
  void,
  void, // NewVacancyData
  { rejectValue: Reject }
>("addVacancy", async (_args, { signal, rejectWithValue }) => {
  try {
    const isValidProps = newVacancySchema.safeParse(_args);
    if (!isValidProps.success) return rejectWithValue("MISMATCH");
    const base = import.meta.env.VITE_API_URL;
    const fullURL: URL = new URL("/api/addVacancy", base);
    const fullOptions: RequestInit = {
      method: "POST",
      signal,
      credentials: "include",
      body: JSON.stringify(isValidProps.data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(fullURL, fullOptions);
    if (!response.ok) {
      if (response.status === 401) return rejectWithValue("UNAUTHENTICATED");
      if (response.status === 403) return rejectWithValue("FORBIDDEN");
      if (response.status >= 500) return rejectWithValue("DOWN");
      return rejectWithValue("SYSTEM");
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError")
      return rejectWithValue("ABORT");
    return rejectWithValue("SYSTEM");
  }
});

interface AddVacancyState {
  status: Status;
  error: Reject | null;
}

const initialState: AddVacancyState = {
  status: "idle",
  error: null,
};

export const selectAddVacancyStatus = (state: RootState) =>
  state.vacancies.addVacancy.status;

export const selectAddVacancyError = (state: RootState) =>
  state.vacancies.addVacancy.error;

const addVacancySlice = createSlice({
  name: "addVacancy/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(addNewVacancy.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        addNewVacancy.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.status = "failure";
          state.error = action.payload ?? "SYSTEM";
        },
      )
      .addCase(addNewVacancy.fulfilled, (state) => {
        state.status = "success";
      }),
});

export default addVacancySlice.reducer;

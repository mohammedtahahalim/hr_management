import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Reject, Status } from "../../../shared/lib/types";
import type { RootState } from "../../../config/store";
import { z } from "zod";

interface FetchVacancyProps {
  id: string;
}

const vacancySchema = z.object({
  id: z.string().nonempty(),
  overviews: z.array(
    z.object({
      type: z.enum(["views", "apps", "shortlist", "progress"]),
      total: z.number().nonnegative(),
      new: z.number(),
    }),
  ),
  trend: z.array(z.number()),
  distribution: z.object({
    total: z.number().nonnegative(),
    data: z.array(
      z.object({
        type: z.enum(["junior", "mid", "senior"]),
        total: z.number().nonnegative(),
      }),
    ),
  }),
  details: z.object({
    title: z.record(z.enum(["en", "ja", "ar", "fr"]), z.string().min(1)),
    status: z.enum(["open", "completed", "inprogress"]),
    openDate: z.string().nonempty(),
    closeDate: z.string().nonempty(),
    salary: z.number().or(z.null()),
    skills: z.record(
      z.enum(["en", "ja", "ar", "fr"]),
      z.array(z.string().nonempty()),
    ),
    description: z.record(
      z.enum(["en", "ja", "ar", "fr"]),
      z.array(z.string().nonempty()),
    ),
    notes: z.record(
      z.enum(["en", "ja", "ar", "fr"]),
      z.array(z.string().nonempty()),
    ),
  }),
});

export type VacancyData = z.infer<typeof vacancySchema>;

export const fetchVacancy = createAsyncThunk<
  VacancyData,
  FetchVacancyProps,
  { rejectValue: Reject }
>("vacancy/fetchById", async (_args, { signal, rejectWithValue }) => {
  try {
    const { id } = _args ?? {};
    if (isNaN(Number(id))) return rejectWithValue("MISMATCH");
    const base = import.meta.env.VITE_API_URL;
    const fullURL: URL = new URL("/api/vacancies", base);
    fullURL.searchParams.set("id", id);
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
    if (
      !dataFromServer ||
      typeof dataFromServer !== "object" ||
      !("data" in dataFromServer)
    )
      return rejectWithValue("MISMATCH");
    const { data } = dataFromServer;
    const isValidData = vacancySchema.safeParse(data);
    if (!isValidData.success) return rejectWithValue("MISMATCH");
    return isValidData.data as VacancyData;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError")
      return rejectWithValue("ABORT");
    return rejectWithValue("SYSTEM");
  }
});

interface VacancyState {
  status: Status;
  error: Reject | null;
  data: VacancyData | null;
}

const initialState: VacancyState = {
  status: "idle",
  error: null,
  data: null,
};

export const selectVacancyStatus = (state: RootState) =>
  state.vacancies.vacancy.status;

export const selectVacancyError = (state: RootState) =>
  state.vacancies.vacancy.error;

export const selectVacancyData = (state: RootState) =>
  state.vacancies.vacancy.data;

export const selectVacancyTitle = (state: RootState) =>
  state.vacancies.vacancy.data?.details.title;

export const selectOverviews = (state: RootState) =>
  state.vacancies.vacancy.data?.overviews;

export const selectApplicantOverTime = (state: RootState) =>
  state.vacancies.vacancy.data?.trend;

export const selectDistributions = (state: RootState) =>
  state.vacancies.vacancy.data?.distribution;

export const selectVacancyDetails = (state: RootState) =>
  state.vacancies.vacancy.data?.details;

const vacancySlice = createSlice({
  name: "vacancy/fetchById",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchVacancy.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchVacancy.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.status = "failure";
          state.error = action.payload ?? "SYSTEM";
        },
      )
      .addCase(
        fetchVacancy.fulfilled,
        (state, action: PayloadAction<VacancyData>) => {
          state.status = "success";
          state.data = action.payload;
        },
      ),
});

export default vacancySlice.reducer;

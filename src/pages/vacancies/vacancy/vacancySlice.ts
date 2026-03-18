import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Reject, Status } from "../../../shared/lib/types";
import { vacancieSchema, type VacancieData } from "../vacancieSlice";
import type { RootState } from "../../../config/store";

interface FetchVacancyProps {
  id: string;
}

export const fetchVacancy = createAsyncThunk<
  VacancieData,
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
    const isValidData = vacancieSchema.safeParse(data);
    if (!isValidData.success) return rejectWithValue("MISMATCH");
    return isValidData.data as VacancieData;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError")
      return rejectWithValue("ABORT");
    return rejectWithValue("SYSTEM");
  }
});

interface VacancyState {
  status: Status;
  error: Reject | null;
  data: VacancieData | null;
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
  state.vacancies.vacancy.data?.title;

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
        (state, action: PayloadAction<VacancieData>) => {
          state.status = "success";
          state.data = action.payload;
        },
      ),
});

export default vacancySlice.reducer;

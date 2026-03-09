import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import z from "zod";
import type { Reject, Status } from "../../shared/lib/types";
import type { RootState } from "../../config/store";

const vacancieSchema = z.object({
  id: z.number().nonnegative(),
  title: z.record(z.enum(["en", "ja", "ar", "fr"]), z.string().min(1)),
  location: z.string().min(1).max(2),
  applicants: z.number().nonnegative(),
  new: z.number().nonnegative(),
  status: z.enum(["open", "completed", "inprogress"]),
  publication: z.string().nonempty(),
  trend: z.array(z.number().nonnegative()),
});

const fetchReturnSchema = z.object({
  currentPage: z.number(),
  pageSize: z.number(),
  lastPage: z.number(),
  data: z.array(vacancieSchema),
});

type VacancieData = z.infer<typeof vacancieSchema>;

interface VacancieState {
  status: Status;
  error: Reject | null;
  data: VacancieData[];
  lastPage: number | null;
}

export type Filters = VacancieData["status"] | "ALL";

interface FetchProps {
  page: string;
  filter: Filters;
}

type FetchReturns = z.infer<typeof fetchReturnSchema>;

type FetchData = Pick<FetchReturns, "lastPage" | "data">;

export const fetchVacancies = createAsyncThunk<
  FetchData,
  FetchProps,
  { rejectValue: Reject }
>("fetch/vacancies", async (_args, { signal, rejectWithValue }) => {
  try {
    const { page, filter } = _args;
    const base = import.meta.env.VITE_API_URL;
    const fullURL: URL = new URL("/api/vacancies", base);
    fullURL.searchParams.set("page", page);
    fullURL.searchParams.set("filter", filter);
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
    const isValidResponse = fetchReturnSchema.safeParse(dataFromServer);
    if (!isValidResponse.success) return rejectWithValue("MISMATCH");
    const { data, lastPage } = isValidResponse.data;
    console.log(data);
    return { data, lastPage };
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return rejectWithValue("ABORT");
    }
    return rejectWithValue("SYSTEM");
  }
});

const initialState: VacancieState = {
  status: "idle",
  error: null,
  data: [],
  lastPage: null,
};

export const selectVacancieStatus = (state: RootState) =>
  state.vacancies.status;

export const selectVacanieError = (state: RootState) => state.vacancies.error;

export const selectVacancieData = (state: RootState) => state.vacancies.data;

export const selectVacancieLastPage = (state: RootState) =>
  state.vacancies.lastPage;

const vacancieSlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchVacancies.rejected,
        (state, action: ReturnType<typeof fetchVacancies.rejected>) => {
          state.status = "failure";
          state.error = action.payload ?? "SYSTEM";
        },
      )
      .addCase(
        fetchVacancies.fulfilled,
        (state, action: ReturnType<typeof fetchVacancies.fulfilled>) => {
          const { data, lastPage } = action.payload;
          state.status = "success";
          state.lastPage = lastPage;
          state.data = data;
        },
      ),
});

export default vacancieSlice.reducer;

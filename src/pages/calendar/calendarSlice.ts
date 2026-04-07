import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";
import type { Reject, Status } from "../../shared/lib/types";
import type { RootState } from "../../config/store";

const calendarEventSchema = z.object({
  data: z.array(
    z.object({
      title: z.string().nonempty(),
      type: z.string().nonempty(),
      startTime: z.iso.datetime(),
      endTime: z.iso.datetime(),
    }),
  ),
});

export type CalendarData = z.infer<typeof calendarEventSchema>;

export type CalendarEvents = CalendarData["data"];

interface FetchCalendarArgs {
  week: string;
}

export const fetchCalendarEvents = createAsyncThunk<
  CalendarEvents,
  FetchCalendarArgs,
  { rejectValue: Reject }
>("calendar/events", async (_args, { signal, rejectWithValue }) => {
  try {
    const { week } = _args;
    if (isNaN(Number(week))) return rejectWithValue("MISMATCH");
    const base = import.meta.env.VITE_API_URL;
    const fullURL: URL = new URL("/api/calendar", base);
    fullURL.searchParams.set("week", week);
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
    const dataFromServer = await response.json();
    const isValidData = calendarEventSchema.safeParse(dataFromServer);
    if (!isValidData.success) return rejectWithValue("MISMATCH");
    const { data } = isValidData.data;
    return data;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError")
      return rejectWithValue("ABORT");
    return rejectWithValue("SYSTEM");
  }
});

interface CalendarState {
  status: Status;
  error: Reject | null;
  data: CalendarEvents;
}

const initialState: CalendarState = {
  status: "idle",
  error: null,
  data: [],
};

export const selectCalendarStatus = (state: RootState) => state.calendar.status;

export const selectCalendarError = (state: RootState) => state.calendar.error;

export const selectCalendarData = (state: RootState) => state.calendar.data;

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCalendarEvents.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchCalendarEvents.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.status = "failure";
          state.error = action.payload ?? "SYSTEM";
        },
      )
      .addCase(
        fetchCalendarEvents.fulfilled,
        (state, action: PayloadAction<CalendarEvents>) => {
          state.status = "success";
          state.data = action.payload;
        },
      ),
});

export default calendarSlice.reducer;

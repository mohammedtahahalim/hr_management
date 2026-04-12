import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Reject, Status } from "../../shared/lib/types";
import type { RootState } from "../../config/store";
import { checkAuth } from "./authSlice";

export const sendLogoutRequest = createAsyncThunk<
  void,
  void,
  { rejectValue: Reject }
>("logout/request", async (_, { signal, rejectWithValue, dispatch }) => {
  try {
    const base = import.meta.env.VITE_API_URL;
    const fullURL: URL = new URL("/api/me", base);
    fullURL.searchParams.set("type", "logout");
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
    dispatch(checkAuth());
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError")
      return rejectWithValue("ABORT");
    return rejectWithValue("SYSTEM");
  }
});

interface LogoutState {
  status: Status;
  error: Reject | null;
}

const initialState: LogoutState = {
  status: "idle",
  error: null,
};

export const selectLogoutStatus = (state: RootState) =>
  state.auth.logout.status;

export const selectLogoutError = (state: RootState) => state.auth.logout.error;

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(sendLogoutRequest.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        sendLogoutRequest.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.status = "failure";
          state.error = action.payload ?? "SYSTEM";
        },
      )
      .addCase(sendLogoutRequest.fulfilled, (state) => {
        state.status = "success";
      }),
});

export default logoutSlice.reducer;

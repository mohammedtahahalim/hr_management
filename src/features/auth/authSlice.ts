import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Status, TRole, Reject } from "../../shared/lib/types";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: TRole;
  email: string;
  profilePic: string;
}

interface AuthState {
  status: Status;
  authState: "unknown" | "authenticated" | "notAuthenticated" | "forbidden";
  systemState: "ok" | "error" | "down";
  networkState: "ABORT" | "";
  whoIs: User | null;
}

export const checkAuth = createAsyncThunk<User, void, { rejectValue: Reject }>(
  "check/auth",
  async (_, { rejectWithValue, signal }) => {
    try {
      const base = import.meta.env.VITE_API_URL;
      const fullURL: URL = new URL("/api/me", base);
      fullURL.searchParams.set("type", "check");
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
      const data = await response.json();
      const { isAuthenticated, whoIs, isAllowed } = data;
      if (!isAuthenticated) return rejectWithValue("UNAUTHENTICATED");
      if (!isAllowed) return rejectWithValue("FORBIDDEN");
      return whoIs as User;
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError")
        return rejectWithValue("ABORT");
      return rejectWithValue("DOWN");
    }
  },
);

const initialState: AuthState = {
  status: "idle",
  authState: "unknown",
  systemState: "ok",
  networkState: "",
  whoIs: null,
};

const authSlice = createSlice({
  name: "auth/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
        state.authState = "unknown";
        state.systemState = "ok";
        state.networkState = "";
      })
      .addCase(
        checkAuth.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.status = "failure";
          switch (action.payload) {
            case "UNAUTHENTICATED":
              state.authState = "notAuthenticated";
              state.systemState = "ok";
              state.networkState = "";
              state.whoIs = null;
              break;
            case "FORBIDDEN":
              state.authState = "forbidden";
              state.systemState = "ok";
              state.networkState = "";
              break;
            case "ABORT":
              state.systemState = "ok";
              state.networkState = "ABORT";
              state.authState = "unknown";
              break;
            case "SYSTEM":
              state.systemState = "error";
              state.networkState = "";
              state.authState = "unknown";
              state.whoIs = null;
              break;
            case "DOWN":
              state.systemState = "down";
              state.networkState = "";
              state.authState = "unknown";
              break;
          }
        },
      )
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "success";
        state.authState = "authenticated";
        state.systemState = "ok";
        state.networkState = "";
        state.whoIs = action.payload;
      }),
});

export default authSlice.reducer;

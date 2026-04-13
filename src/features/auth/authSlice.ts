import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "../../config/store";
import type { Status, Reject } from "../../shared/lib/types";
import z from "zod";

/* ----------------------------- Schema ----------------------------- */

const authSchema = z.object({
  user: z.object({
    id: z.number().nonnegative(),
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    role: z.enum(["admin", "manager", "hr", "employee", "candidate"]),
    email: z.email(),
    profilePic: z.string().or(z.null()),
  }),
});

export type AuthType = z.infer<typeof authSchema>;
export type User = AuthType["user"];

/* ----------------------------- State ----------------------------- */

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  status: Status;
  error: Reject | null;
  loginStatus: Status;
  logoutStatus: Status;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  status: "idle",
  error: null,
  loginStatus: "idle",
  logoutStatus: "idle",
};

/* ----------------------------- Thunks ----------------------------- */

export const checkAuth = createAsyncThunk<User, void, { rejectValue: Reject }>(
  "auth/check",
  async (_, { rejectWithValue, signal }) => {
    try {
      const base = import.meta.env.VITE_API_URL;
      const url = new URL("/api/me", base);
      url.searchParams.set("type", "check");

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        signal,
      });

      if (!response.ok) {
        if (response.status === 401) return rejectWithValue("UNAUTHENTICATED");
        if (response.status === 403) return rejectWithValue("FORBIDDEN");
        if (response.status >= 500) return rejectWithValue("DOWN");
        return rejectWithValue("SYSTEM");
      }

      const data = await response.json();
      const parsed = authSchema.safeParse(data);

      if (!parsed.success) return rejectWithValue("MISMATCH");

      return parsed.data.user;
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return rejectWithValue("ABORT");
      }
      return rejectWithValue("DOWN");
    }
  },
);

export const login = createAsyncThunk<
  User,
  { email: string; password: string; rememberMe: boolean },
  { rejectValue: Reject }
>("auth/login", async (payload, { rejectWithValue, signal }) => {
  try {
    const base = import.meta.env.VITE_API_URL;
    const url = new URL("/api/me", base);
    url.searchParams.set("type", "login");

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      if (response.status === 401) return rejectWithValue("UNAUTHENTICATED");
      if (response.status === 403) return rejectWithValue("FORBIDDEN");
      if (response.status >= 500) return rejectWithValue("DOWN");
      return rejectWithValue("SYSTEM");
    }

    const data = await response.json();
    const parsed = authSchema.safeParse(data);

    if (!parsed.success) return rejectWithValue("MISMATCH");

    return parsed.data.user;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return rejectWithValue("ABORT");
    }
    return rejectWithValue("SYSTEM");
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: Reject }>(
  "auth/logout",
  async (_, { rejectWithValue, signal }) => {
    try {
      const base = import.meta.env.VITE_API_URL;
      const url = new URL("/api/me", base);
      url.searchParams.set("type", "logout");

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        signal,
      });

      if (!response.ok) {
        if (response.status === 401) return rejectWithValue("UNAUTHENTICATED");
        if (response.status === 403) return rejectWithValue("FORBIDDEN");
        if (response.status >= 500) return rejectWithValue("DOWN");
        return rejectWithValue("SYSTEM");
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return rejectWithValue("ABORT");
      }
      return rejectWithValue("SYSTEM");
    }
  },
);

/* ----------------------------- Slice ----------------------------- */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: () => initialState,
  },
  extraReducers: (builder) => {
    /* -------- checkAuth -------- */
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "success";
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isInitialized = true;
      })
      .addCase(
        checkAuth.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.status = "failure";
          state.isInitialized = true;
          const error = action.payload ?? "SYSTEM";
          if (error === "UNAUTHENTICATED" || error === "FORBIDDEN") {
            state.user = null;
            state.isAuthenticated = false;
          } else {
            state.error = error;
          }
        },
      );

    /* -------- login -------- */
    builder
      .addCase(login.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.loginStatus = "success";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = "failure";
        state.error = action.payload ?? "SYSTEM";
      });

    /* -------- logout -------- */
    builder
      .addCase(logout.pending, (state) => {
        state.logoutStatus = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.logoutStatus = "success";
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutStatus = "failure";
        state.error = action.payload ?? "SYSTEM";
      });
  },
});

/* ----------------------------- Selectors ----------------------------- */

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectIsInitialized = (state: RootState) =>
  state.auth.isInitialized;

export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;

export const selectLoginStatus = (state: RootState) => state.auth.loginStatus;
export const selectLogoutStatus = (state: RootState) => state.auth.logoutStatus;

/* ----------------------------- Export ----------------------------- */

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;

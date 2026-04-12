import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";
import type { Reject, Status } from "../../shared/lib/types";
import type { RootState } from "../../config/store";
import { checkAuth } from "./authSlice";

const loginSchema = z.object({
  email: z
    .string()
    .regex(
      /^(?!.*[_.-][_.-])(?![_.-].*)[a-zA-Z0-9_.-]+(?<![_.-])@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/,
    ),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_=+[\]{}\\|;:'",.<>?-])[a-zA-Z0-9!@#$%^&*()_=+[\]{}\\|;:'.",<>?-]{4,30}$/,
    ),
  rememberMe: z.boolean(),
});

type LoginRequestProps = z.infer<typeof loginSchema>;

export const sendLoginRequest = createAsyncThunk<
  void,
  LoginRequestProps,
  { rejectValue: Reject }
>("login/request", async (_args, { signal, rejectWithValue, dispatch }) => {
  try {
    const isValidProps = loginSchema.safeParse(_args);
    if (!isValidProps.success) return rejectWithValue("MISMATCH");
    const { email, password, rememberMe } = isValidProps.data;
    const base = import.meta.env.VITE_API_URL;
    const fullURL: URL = new URL("/api/me", base);
    fullURL.searchParams.set("type", "login");
    const fullOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal,
      body: JSON.stringify({ email, password, rememberMe }),
    };
    const response = await fetch(fullURL, fullOptions);
    if (!response.ok) {
      if (response.status === 401) return rejectWithValue("UNAUTHENTICATED");
      if (response.status === 403) return rejectWithValue("FORBIDDEN");
      if (response.status >= 500) return rejectWithValue("DOWN");
      return rejectWithValue("SYSTEM");
    }
    // dispatch(checkAuth());
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError")
      return rejectWithValue("ABORT");
    return rejectWithValue("SYSTEM");
  }
});

interface LoginState {
  status: Status;
  error: Reject | null;
}

const initialState: LoginState = {
  status: "idle",
  error: null,
};

export const selectLoginStatus = (state: RootState) => state.auth.login.status;

export const selectLoginError = (state: RootState) => state.auth.login.error;

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(sendLoginRequest.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        sendLoginRequest.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.status = "failure";
          state.error = action.payload ?? "SYSTEM";
        },
      )
      .addCase(sendLoginRequest.fulfilled, (state) => {
        state.status = "success";
      }),
});

export default loginSlice.reducer;

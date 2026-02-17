import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

type Status = "idle" | "loading" | "failure" | "success";

type TRole = "admin" | "manager" | "hr" | "employee" | "candidat";

type AuthReject = "UNAUTHENTICATED" | "FORBIDDEN" | "SYSTEM" | "ABORT" | "DOWN";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: TRole;
  email: string;
}

interface AuthState {
  status: Status;
  authState: "unknown" | "authenticated" | "notAuthenticated" | "forbidden";
  systemState: "ok" | "error" | "down";
  networkState: "ABORT" | "";
  whoIs: User | null;
}

export const checkAuth = createAsyncThunk<
  User,
  void,
  { rejectValue: AuthReject }
>("check/auth", async (_, { rejectWithValue, signal }) => {
  try {
    const fullURL: string = `${import.meta.env.VITE_API_URL}/api/auth`;
    const fullOptions: RequestInit = {
      method: "GET",
      credentials: "include",
      signal,
    };
    const response = await fetch(fullURL, fullOptions);
    if (!response.ok) throw new Error(response.status.toString());
    const data = await response.json();
    const { isAuthenticated, whoIs, isAllowed } = data;
    if (!isAuthenticated) throw new Error("401");
    if (!isAllowed) throw new Error("403");
    return whoIs as User;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return rejectWithValue("ABORT");
    }
    if (err instanceof Error) {
      if (err.message === "401") return rejectWithValue("UNAUTHENTICATED");
      if (err.message === "403") return rejectWithValue("FORBIDDEN");
      if (err.message === "500") return rejectWithValue("SYSTEM");
    }
    return rejectWithValue("DOWN");
  }
});

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
  reducers: {
    setAuthenticated: (state, action: PayloadAction<User>) => {
      state.status = "success";
      state.authState = "authenticated";
      state.systemState = "ok";
      state.networkState = "";
      state.whoIs = action.payload;
    },
    setNotAuthenticated: (state) => {
      state.status = "success";
      state.authState = "notAuthenticated";
      state.systemState = "ok";
      state.networkState = "";
      state.whoIs = null;
    },
  },
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
        (state, action: PayloadAction<AuthReject | undefined>) => {
          state.status = "failure";
          state.whoIs = null;
          switch (action.payload) {
            case "UNAUTHENTICATED":
              state.authState = "notAuthenticated";
              state.systemState = "ok";
              state.networkState = "";
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
              state.authState = "notAuthenticated";
              break;
            case "DOWN":
              state.systemState = "down";
              state.networkState = "";
              state.authState = "notAuthenticated";
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
export const { setAuthenticated, setNotAuthenticated } = authSlice.actions;

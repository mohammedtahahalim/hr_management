import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";
import type { Reject, Status } from "../../../shared/lib/types";
import type { RootState } from "../../../config/store";

const collectionSchema = z.object({
  insource: z.array(z.number().nonnegative()),
  outsource: z.array(z.number().nonnegative()),
});

export type CollectionData = z.infer<typeof collectionSchema>;

interface CollectionState {
  status: Status;
  error: Reject | null;
  data: CollectionData;
}

export const fetchCollections = createAsyncThunk<
  CollectionData,
  void,
  { rejectValue: Reject }
>("fetch/collection", async (_, { signal, rejectWithValue }) => {
  try {
    const base = import.meta.env.VITE_API_URL;
    const fullURL: URL = new URL("/api/dashboard", base);
    fullURL.searchParams.set("block", "collection");
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
    const isValid = collectionSchema.safeParse(data);
    if (!isValid.success) return rejectWithValue("MISMATCH");
    return isValid.data as CollectionData;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError")
      return rejectWithValue("ABORT");
    return rejectWithValue("SYSTEM");
  }
});

const initialState: CollectionState = {
  status: "idle",
  error: null,
  data: {
    insource: [],
    outsource: [],
  },
};

export const selectCollectionStatus = (state: RootState) =>
  state.dashboard.collection.status;

export const selectCollectionError = (state: RootState) =>
  state.dashboard.collection.error;

export const selectCollectionData = (state: RootState) =>
  state.dashboard.collection.data;

export const selectInsource = (state: RootState) =>
  state.dashboard.collection.data.insource;

export const selectOutsource = (state: RootState) =>
  state.dashboard.collection.data.outsource;

const collectionSlice = createSlice({
  name: "collection/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCollections.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchCollections.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.status = "failure";
          state.error = action.payload ?? "SYSTEM";
        },
      )
      .addCase(
        fetchCollections.fulfilled,
        (state, action: PayloadAction<CollectionData>) => {
          state.status = "success";
          state.data = action.payload;
        },
      ),
});

export default collectionSlice.reducer;

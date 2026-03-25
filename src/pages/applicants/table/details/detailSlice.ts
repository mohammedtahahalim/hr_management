import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import z from "zod";
import type { Reject, Status } from "../../../../shared/lib/types";
import type { RootState } from "../../../../config/store";

const applicantDetailSchema = z.object({
  id: z.string().nonempty(),
  general: z.object({
    name: z.record(z.enum(["en", "ar", "ja", "fr"]), z.string().nonempty()),
    status: z.enum([
      "hr",
      "interview1",
      "interview2",
      "systemDesign",
      "culturalFit",
      "ceo",
    ]),
    position: z.enum([
      "front",
      "backend",
      "design",
      "fullStack",
      "data",
      "c++",
      "php",
      "django",
      "project",
      "devOps",
      "cloud",
    ]),
  }),
  personal: z.object({
    email: z.email(),
    phone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/)
      .or(z.null()),
    linkedin: z.url().or(z.null()),
    appliedDate: z.iso.datetime(),
  }),
  educations: z.array(
    z.object({
      school: z.record(z.enum(["en", "ar", "ja", "fr"]), z.string()), // School name
      degree: z.record(z.enum(["en", "ar", "ja", "fr"]), z.string()), // Degree
      graduated: z.string().regex(/\d{4}/), // Year obtained
    }),
  ),
  experiences: z.array(
    z.object({
      position: z.record(z.enum(["en", "ar", "ja", "fr"]), z.string()), // Position at job
      company: z.record(z.enum(["en", "ar", "ja", "fr"]), z.string()), // company name
      tasks: z.array(z.record(z.enum(["en", "ar", "ja", "fr"]), z.string())), // Tasks done at this job
      location: z.string().min(1).max(2), // geocode for country
      startDate: z.iso.datetime(), // start date
      endDate: z.iso.datetime().or(z.null()), // if null, currently still working
    }),
  ),
  skills: z.array(
    z.enum([
      "javascript",
      "typescript",
      "html",
      "css",
      "sql",
      "react",
      "vue",
      "angular",
      "redux",
      "next.js",
      "tailwind",
      "node.js",
      "express",
      "nestjs",
      "mongodb",
      "postgresql",
      "mysql",
    ]),
  ),
});

type ApplicationDetail = z.infer<typeof applicantDetailSchema>;

export type Positions = ApplicationDetail["general"]["position"];

type FetchDetailsProps = { id: number };

export const fetchDetails = createAsyncThunk<
  ApplicationDetail,
  FetchDetailsProps,
  { rejectValue: Reject }
>("applicant/details", async (_args, { signal, rejectWithValue }) => {
  try {
    const { id } = _args;
    if (typeof id !== "number") return rejectWithValue("MISMATCH");
    const base = import.meta.env.VITE_API_URL;
    const fullURL: URL = new URL("/api/applicants", base);
    fullURL.searchParams.set("id", String(id));
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
    const isValidData = applicantDetailSchema.safeParse(data);
    if (!isValidData.success) return rejectWithValue("MISMATCH");
    return isValidData.data;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError")
      return rejectWithValue("ABORT");
    return rejectWithValue("SYSTEM");
  }
});

type ApplicationDetailState = {
  status: Status;
  error: Reject | null;
  data: ApplicationDetail | null;
};

const initialState: ApplicationDetailState = {
  status: "idle",
  error: null,
  data: null,
};

export const selectDetailStatus = (state: RootState) =>
  state.applicants.details.status;

export const selectDetailError = (state: RootState) =>
  state.applicants.details.error;

export const selectDetailGeneral = (state: RootState) =>
  state.applicants.details.data?.general;

export const selectDetailPersonal = (state: RootState) =>
  state.applicants.details.data?.personal;

export const selectDetailEducation = (state: RootState) =>
  state.applicants.details.data?.educations;

export const selectDetailExperience = (state: RootState) =>
  state.applicants.details.data?.experiences;

export const selectDetailSkills = (state: RootState) =>
  state.applicants.details.data?.skills;

const detailSlice = createSlice({
  name: "details/slice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchDetails.rejected,
        (state, action: PayloadAction<Reject | undefined>) => {
          state.status = "failure";
          state.error = action.payload ?? "SYSTEM";
        },
      )
      .addCase(
        fetchDetails.fulfilled,
        (state, action: PayloadAction<ApplicationDetail>) => {
          state.status = "success";
          state.data = action.payload;
        },
      ),
});

export default detailSlice.reducer;

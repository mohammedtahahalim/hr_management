import type { Theme } from "@mui/material/styles";
import type { ICandidat } from "../../pages/dashboard/candidate/candidateSlice";

export type PaletteColorKey = keyof Pick<
  Theme["palette"],
  "primary" | "secondary" | "success" | "error" | "info" | "warning"
>;

export type Status = "idle" | "loading" | "failure" | "success";
export type Offer = "OFFER" | "SHORTLIST" | "REJECT" | "PENDING";
export type TRole = "admin" | "manager" | "hr" | "employee" | "candidat";
export type Reject =
  | "UNAUTHENTICATED"
  | "FORBIDDEN"
  | "SYSTEM"
  | "ABORT"
  | "DOWN";

export type OfferState = ICandidat["offerState"];

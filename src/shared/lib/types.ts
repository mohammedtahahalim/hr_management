import type { Theme } from "@mui/material/styles";
import type { ICandidat } from "../../pages/dashboard/candidate/candidateSlice";

export type PaletteColorKey = keyof Pick<
  Theme["palette"],
  "primary" | "secondary" | "success" | "error" | "info" | "warning"
>;

export type DeptColor = keyof Pick<
  Theme["palette"],
  "first" | "second" | "third" | "fourth" | "icon"
>;

export type Status = "idle" | "loading" | "failure" | "success";
export type Offer = "OFFER" | "SHORTLIST" | "REJECT" | "PENDING";
export type TRole = "admin" | "manager" | "hr" | "employee" | "candidate";
export type Reject =
  | "UNAUTHENTICATED"
  | "FORBIDDEN"
  | "SYSTEM"
  | "ABORT"
  | "DOWN"
  | "MISMATCH"
  | "BAD";

export type OfferState = ICandidat["offerState"];

export type DistributionWeek = "01-07" | "07-14" | "14-21" | "21-28";

export type PositionColor = keyof Pick<
  Theme["palette"],
  "first" | "success" | "error" | "second" | "third" | "fourth" | "success"
>;

export type Mode = "view" | "edit";

export type Operation = "CREATE" | "READ" | "UPDATE" | "DELETE";

export type Resource =
  | "dashboard"
  | "vacancy"
  | "employee"
  | "applicant"
  | "payroll"
  | "calendar";

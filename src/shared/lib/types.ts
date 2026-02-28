import type { ButtonProps } from "@mui/material";

export type Status = "idle" | "loading" | "failure" | "success";
export type Offer = "OFFER" | "SHORTLIST" | "REJECT" | "PENDING";
export type TRole = "admin" | "manager" | "hr" | "employee" | "candidat";
export type Reject =
  | "UNAUTHENTICATED"
  | "FORBIDDEN"
  | "SYSTEM"
  | "ABORT"
  | "DOWN";
export type MuiColors = ButtonProps["color"];

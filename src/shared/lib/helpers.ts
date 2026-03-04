import type { User } from "../../features/auth/authSlice";
import { routesWithPermissions } from "./constants";
import type { DistributionWeek, Status } from "./types";

export const canAccessRoute = (route: string, whoIs: User): boolean => {
  const { role } = whoIs;
  const absPath = route.split("/")[1];
  if (!(absPath in routesWithPermissions)) return true;
  return routesWithPermissions[absPath].includes(role);
};

export const isLoading = (status: Status): boolean => {
  return status === "idle" || status === "loading";
};

export const extractCurrentWeek = (): DistributionWeek => {
  const date = new Date().getDate();
  if (date <= 7) return "01-07";
  if (date <= 14) return "07-14";
  if (date <= 21) return "14-21";
  return "21-28";
};

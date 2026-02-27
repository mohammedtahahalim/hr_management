import type { User } from "../../features/auth/authSlice";
import { routesWithPermissions } from "./constants";
import type { Status } from "./types";

export const canAccessRoute = (route: string, whoIs: User): boolean => {
  const { role } = whoIs;
  const absPath = route.split("/")[1];
  if (!(absPath in routesWithPermissions)) return true;
  return routesWithPermissions[absPath].includes(role);
};

export const isLoading = (status: Status): boolean => {
  return status === "idle" || status === "loading";
};

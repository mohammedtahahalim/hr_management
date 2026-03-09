import type { TLanguage } from "../../config/i18n";
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

export const fetchMonth = (month: number, lang: TLanguage): string => {
  const date = new Date(2024, month);
  const formatMonth = new Intl.DateTimeFormat(lang, { month: "short" }).format(
    date,
  );
  return formatMonth;
};

export const displayControlPages = (
  currentPage: number,
  lastPage: number,
): number[] => {
  const min = Math.max(1, Math.min(currentPage - 2, lastPage - 4));
  const max = Math.min(Math.max(currentPage + 2, 5), lastPage);
  return Array.from(
    { length: Math.min(5, max - min + 1) },
    (_, idx) => min + idx,
  );
};

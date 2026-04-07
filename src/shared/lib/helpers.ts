import type { TLanguage } from "../../config/i18n";
import type { User } from "../../features/auth/authSlice";
import { FOCUSABLE_SELECTORS, names, routesWithPermissions } from "./constants";
import type { DistributionWeek, PositionColor, Status } from "./types";

export const canAccessRoute = (route: string, whoIs: User): boolean => {
  const { role } = whoIs;
  const paths = route.split("/");
  const absPath = paths[paths.length - 1];
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

export const formatDate = (
  dateString: string,
  lang: TLanguage,
  withYear: boolean = true,
  withDay: boolean = true,
): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(lang, {
    ...(withYear ? { year: "numeric" } : {}),
    month: "long",
    ...(withDay ? { day: "numeric" } : {}),
  }).format(date);
};

export const generateRandomImage = () => {
  return `https://api.dicebear.com/9.x/avataaars/svg?seed=${names[Math.floor(Math.random() * names.length)]}`;
};

export const getLast7DaysISO = (): string[] => {
  const result: string[] = [];
  const today = new Date();

  for (let i = 0; i < 6; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    result.push(date.toISOString());
  }

  return result.reverse();
};

export const YAxis = (trend: number[] | undefined) => {
  let min = Math.min(...(trend ?? []));
  const max = Math.max(...(trend ?? []));
  console.log(min, max);
  for (let i = 0; i < 10; i++) {
    if ((min - i) % 10 === 0) {
      min -= i;
      break;
    }
  }
  for (let i = 0; i < 10; i++) {
    if ((max + i) % 10 === 0) {
      min += i;
      break;
    }
  }
  console.log(min, max);
  return [min, max];
};

export const generateRandomPosColor = (): PositionColor => {
  const colors: Partial<PositionColor>[] = [
    "first",
    "fourth",
    "second",
    "third",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
  ).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"),
  );
};

export const getMonthYearFromWeek = (
  week: number | string,
  lang: TLanguage,
) => {
  const now = new Date();
  const year = now.getFullYear();

  const jan4 = new Date(year, 0, 4);

  const dayOfWeek = jan4.getDay() || 7;
  const mondayWeek1 = new Date(jan4);
  mondayWeek1.setDate(jan4.getDate() - dayOfWeek + 1);

  // Step 3: compute target week date
  const targetDate = new Date(mondayWeek1);
  targetDate.setDate(mondayWeek1.getDate() + (Number(week) - 1) * 7);

  // Step 4: format month - year
  const formatted = new Intl.DateTimeFormat(lang, {
    month: "long",
    year: "numeric",
  }).format(targetDate);

  return formatted;
};

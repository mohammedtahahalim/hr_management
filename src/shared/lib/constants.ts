import type { OverridableComponent } from "@mui/material/OverridableComponent";
import type { TLanguage } from "../../config/i18n";
import type {
  DeptColor,
  Offer,
  OfferState,
  PaletteColorKey,
  PositionColor,
  Reject,
  TRole,
} from "./types";
import type { SvgIconTypeMap } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SecurityIcon from "@mui/icons-material/Security";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ExtensionIcon from "@mui/icons-material/Extension";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import type { DeptName } from "../../pages/dashboard/departments/departmentSlice";
import type {
  Filters,
  VacancieData,
} from "../../pages/vacancies/vacancieSlice";

type MuiIcon = OverridableComponent<SvgIconTypeMap<object, "svg">> & {
  muiName: string;
};

export type HTTPBackendErrors = "400" | "401" | "403" | "500" | "522";

export type TOASTErrors = HTTPBackendErrors & Reject;

export const HTTPErrors: Record<TOASTErrors, Record<TLanguage, string>> = {
  "400": {
    ar: "طلب غير صالح.",
    en: "Bad request.",
    fr: "Requête invalide.",
    ja: "不正なリクエストです。",
  },
  "401": {
    ar: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    en: "Incorrect email or password.",
    fr: "Email ou mot de passe incorrect.",
    ja: "メールアドレスまたはパスワードが正しくありません。",
  },
  "403": {
    ar: "تم حظر هذا الحساب. يرجى التواصل مع الدعم.",
    en: "This account has been banned. Please contact support.",
    fr: "Ce compte a été suspendu. Veuillez contacter le support.",
    ja: "このアカウントは停止されています。サポートへお問い合わせください。",
  },
  "500": {
    ar: "الخادم غير متاح حاليًا. يرجى المحاولة لاحقًا.",
    en: "Server is currently unavailable. Please try again later.",
    fr: "Le serveur est actuellement indisponible. Veuillez réessayer plus tard.",
    ja: "現在サーバーをご利用いただけません。しばらくしてから再試行してください。",
  },
  "522": {
    ar: "النظام تحت الصيانة حاليًا. يرجى المحاولة لاحقًا.",
    en: "System is under maintenance. Please try again later.",
    fr: "Le système est en maintenance. Veuillez réessayer plus tard.",
    ja: "現在メンテナンス中です。しばらくしてから再試行してください。",
  },
  UNAUTHENTICATED: {
    en: "You are not authenticated.",
    ar: "أنت غير مصرح لك.",
    ja: "認証されていません。",
    fr: "Vous n'êtes pas authentifié.",
  },
  FORBIDDEN: {
    en: "You do not have permission.",
    ar: "ليس لديك إذن.",
    ja: "許可されていません。",
    fr: "Vous n'avez pas la permission.",
  },
  SYSTEM: {
    en: "A system error occurred.",
    ar: "حدث خطأ في النظام.",
    ja: "システムエラーが発生しました。",
    fr: "Une erreur système est survenue.",
  },
  ABORT: {
    en: "The operation was aborted.",
    ar: "تم إلغاء العملية.",
    ja: "操作が中止されました。",
    fr: "L'opération a été annulée.",
  },
  DOWN: {
    en: "Service is currently down.",
    ar: "الخدمة غير متاحة حالياً.",
    ja: "サービスは現在停止中です。",
    fr: "Le service est actuellement indisponible.",
  },
  MISMATCH: {
    en: "Please fill in all cases.",
    ar: "يرجى ملء جميع الخانات.",
    ja: "すべての項目にご記入ください。",
    fr: "Veuillez remplir tous les champs.",
  },
};

export const routesWithPermissions: Record<string, TRole[]> = {
  "add-vacancy": ["admin", "hr"],
  "add-employee": ["admin", "hr"],
  payroll: ["admin"],
};

export const navIcons: Record<string, MuiIcon> = {
  "/dashboard": DashboardIcon,
  "/vacancies": BusinessCenterIcon,
  "/applicants": PersonIcon,
  "/employees": GroupsIcon,
  "/payroll": ReceiptIcon,
  "/calendar": CalendarMonthIcon,
};

export const formateDateToLong = (date: Date, lang: TLanguage): string => {
  const usFormatter = new Intl.DateTimeFormat(lang, {
    weekday: "short",
    year: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return usFormatter.format(date);
};

export const formateDate = (date: Date, lang: TLanguage): string => {
  const usFormatter = new Intl.DateTimeFormat(lang, {
    weekday: "short",
    year: "2-digit",
    month: "2-digit",
  });
  return usFormatter.format(date);
};

export const settingIcons: Record<string, MuiIcon> = {
  PersonOutline: PersonOutlineIcon,
  Security: SecurityIcon,
  NotificationsNone: NotificationsNoneIcon,
  Extension: ExtensionIcon,
  Settings: AdminPanelSettingsIcon,
};

export const calculatePercentage = (
  total: number,
  fraction: number,
): number => {
  if (!fraction || !total) return 0;
  return Math.floor((fraction * 100) / total);
};

export const offerColors = (offer: Offer): PaletteColorKey => {
  switch (offer) {
    case "OFFER":
      return "success";
    case "SHORTLIST":
      return "info";
    case "PENDING":
      return "warning";
    case "REJECT":
      return "error";
  }
};

const offerPositionsMap: Record<string, Record<TLanguage, string>> = {
  OFFER: {
    en: "OFFER",
    ar: "عرض",
    ja: "オファー",
    fr: "OFFRE",
  },
  SHORTLIST: {
    en: "SHORTLIST",
    ar: "المختصرة",
    ja: "ショートリスト",
    fr: "PRÉSÉLECTION",
  },
  REJECT: { en: "REJECT", ar: "رفض", ja: "拒否する", fr: "REJETÉE" },
  PENDING: { en: "PENDING", ar: "قيد الانتظار", ja: "保留中", fr: "ATTENTE" },
};

export const offerState = (position: OfferState, lng: TLanguage): string => {
  return offerPositionsMap[position][lng];
};

export const departmentColor = (deptName: DeptName): DeptColor => {
  switch (deptName) {
    case "analytics":
      return "first";
    case "development":
      return "second";
    case "finance":
      return "third";
    case "management":
      return "fourth";
    case "data":
      return "second";
    case "hr":
      return "first";
    default:
      return "third";
  }
};

export const filterButtons: Filters[] = [
  "all",
  "completed",
  "inprogress",
  "open",
];

export const positionColor: Record<VacancieData["status"], PositionColor> = {
  completed: "success",
  inprogress: "error",
  open: "first",
};

export const names = [
  "John Carter",
  "Ava Williams",
  "Noah Johnson",
  "Mia Anderson",
  "Ethan Walker",
  "Olivia Brown",
  "Élodie Martin",
  "François Dubois",
  "Chloé Bernard",
  "Jérôme Laurent",
  "Camille Lefèvre",
  "Étienne Moreau",
  "田中 悠希",
  "佐藤 恒一",
  "鈴木 美咲",
  "高橋 健太",
  "伊藤 彩",
  "中村 玲奈",
  "أمينة بنعلي",
  "يوسف الإدريسي",
  "سارة العلوي",
  "محمد بن يوسف",
  "ليلى الزهراء",
  "طارق السعدي",
];

export const depts = [
  "frontend",
  "backend",
  "fullStack",
  "devOps",
  "cloud",
  "data",
  "qa",
  "mobile",
  "ml",
  "site",
];

export const overviewBoxesColor: string[] = [
  "#defbe3",
  "#eff4fd",
  "#f3effc",
  "#fdefde",
];

export const darkOverviewBoxesColor: string[] = [
  "#1f3a2a", // dark green
  "#1f2d3d", // dark blue
  "#2a2438", // dark purple
  "#3a2a1f", // dark orange/brown
];

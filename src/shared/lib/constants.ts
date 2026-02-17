import type { TLanguage } from "../../config/i18n";

export type HTTPBackendErrors = "400" | "401" | "403" | "500" | "522";

export const HTTPErrors: Record<
  HTTPBackendErrors,
  Record<TLanguage, string>
> = {
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
};

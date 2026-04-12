export const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const IMAGE_SEED = "https://api.dicebear.com/9.x/avataaars/svg?seed=";

export const ALLOWED_QUERIES = {
  dashboard: [
    "candidate",
    "departments",
    "distribution",
    "recent",
    "collection",
    "activity",
  ],
  vacancies: {
    filter: ["open", "completed", "inprogress", "all"],
    dept: ["all", "dev", "sales", "manager", "supp", "data"],
    posType: [
      "all",
      "ux_ui",
      "pm",
      "react",
      "qa",
      "data",
      "java",
      "devops",
      "django",
    ],
    exp: ["all", "junior", "juniorPlus", "mid", "midPlus", "senior"],
    loc: ["all", "us", "ja", "ar", "fr", "uk", "ma"],
  },
  applicants: ["overview"],
  auth: ["check", "login", "logout"],
};

export const LANGS = ["en", "fr", "ar", "ja"];

export const EMPLOYEE_STATUS = ["active", "remote", "onleave", "terminated"];

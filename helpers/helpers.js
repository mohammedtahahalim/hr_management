import { NAMES } from "../helpers/data/names.js";
import { POSITIONS } from "../helpers/data/positions.js";
import { OFFER_STATES } from "../helpers/data/offerStates.js";
import { DEPARTMENTS } from "../helpers/data/departments.js";
import { JOB_TITLES } from "../helpers/data/jobTitles.js";
import { LOCATIONS } from "../helpers/data/countries.js";
import { ACTIVITIES } from "../helpers/data/activities.js";
import { IMAGE_SEED, LANGS, EMPLOYEE_STATUS, ALPHABETS } from "./constants.js";
import { SKILLSPOOL } from "../helpers/data/skills.js";
import { INTERVIEWSTEPS } from "../helpers/data/interviewSteps.js";
import { PHONENUMBERS } from "../helpers/data/phoneNumbers.js";
import { DEGREES } from "../helpers/data/degrees.js";
import { SCHOOLS } from "../helpers/data/schools.js";
import { COMPANIES } from "../helpers/data/companies.js";
import { TASKS } from "../helpers/data/tasks.js";
import { ACTIVEPROJECTS } from "../helpers/data/activeProjects.js";

const randomInt = (min, max) => min + Math.floor(Math.random() * (max - min));

const randomFrom = (arr) => arr[randomInt(0, arr.length)];

const randomDate = (
  start = new Date(),
  end = new Date(Date.now() + randomInt(1, 5) * 31536000000),
  rand = () => 0,
) => new Date(start.getTime() + rand() * (end.getTime() - start.getTime()));

const randomEmail = (name) =>
  name.replace(/\s/g, randomFrom(["-", "_", "."])) +
  "@" +
  randomFrom(["hotmail", "gmail", "yahoo", "outlook"]) +
  "." +
  randomFrom(["com", "co.jp", "fr", "ma", "net"]);

const randomPicture = () => {
  return IMAGE_SEED + randomFrom(NAMES)["en"];
};

const formatDate = (date) => date.toISOString();

const generateFakePassport = () => {
  return Array.from({ length: 8 }, () => Math.random().toString(36)[2])
    .join("")
    .toUpperCase();
};

const generateFakeBankAcc = () => {
  const num = () => Math.floor(1000 + Math.random() * 9000);
  return `${num()}-${num()}-${num()}-${num()}`;
};

const generateFakeIFSC = () => {
  return (
    Array.from(
      { length: 4 },
      () => ALPHABETS[Math.floor(Math.random() * 26)],
    ).join("") +
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 10)).join("")
  );
};

const generateFakePAN = () => {
  return (
    ALPHABETS[Math.floor(Math.random() * 26)] +
    ALPHABETS[Math.floor(Math.random() * 26)] +
    Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join("") +
    ALPHABETS[Math.floor(Math.random() * 26)] +
    ALPHABETS[Math.floor(Math.random() * 26)]
  );
};

const hashString = (str) => {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
};

const mulberry32 = (a) => {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const mapLang = (fn) => Object.fromEntries(LANGS.map((l) => [l, fn(l)]));

const generateSharpRandom = (
  length = 12,
  maxStep = 20,
  flipProbability = 0.3,
) => {
  const result = [];

  let value = 0;
  let direction = Math.random() > 0.5 ? 1 : -1;

  for (let i = 0; i < length; i++) {
    if (Math.random() < flipProbability) {
      direction *= -1;
    }

    const step = Math.random() * maxStep;
    value += direction * step;

    result.push(Math.floor(value));
  }

  return result;
};

export const generateCandidates = () => {
  return Array.from({ length: randomInt(250, 500) }, () => ({
    id: randomInt(1, 100000),
    name: randomFrom(NAMES),
    position: randomFrom(POSITIONS),
    offerState: randomFrom(OFFER_STATES),
  }));
};

export const generateDepartments = () => {
  return DEPARTMENTS.map((d) => {
    const random = randomInt(0, 4);
    return {
      departmentName: d,
      pictures: Array.from(
        { length: random },
        () => IMAGE_SEED + randomFrom(NAMES)["en"],
      ),
      newApps: random,
    };
  });
};

export const generateDistributions = () => {
  return {
    total: randomInt(100, 300),
    distributions: DEPARTMENTS.map((d) => {
      return { deptName: d, percentage: randomInt(1, 35) };
    }),
  };
};

export const generateRecentJobs = () => {
  return Array.from({ length: randomInt(10, 100) }, () => {
    return {
      id: randomInt(1, 100000),
      jobTitle: randomFrom(JOB_TITLES),
      location: randomFrom(LOCATIONS),
      totalApps: randomInt(10, 100),
      trend: generateSharpRandom(),
    };
  });
};

export const generateDashboardActivities = () => {
  return Array.from({ length: randomInt(5, 15) }, () => ({
    id: randomInt(1, 100000),
    ...randomFrom(ACTIVITIES),
    date: `${randomInt(0, 1)}${randomInt(1, 10)}-${randomInt(0, 3)}${randomInt(1, 10)}`,
  }));
};

// TODO: refactor
export const generateRandomVacancy = (id) => {
  const seed = hashString(id)();
  const rand = mulberry32(seed);

  const generateTrend = (length) => {
    const base = randomInt(80, 200);
    const amplitude = randomInt(10, 40);
    const frequency = rand() * 0.5 + 0.2;

    return Array.from({ length }, (_, i) => {
      const wave = Math.sin(i * frequency) * amplitude;
      const noise = randomInt(-5, 5);
      return Math.max(0, Math.round(base + wave + noise));
    });
  };

  const skillsPool = {
    en: ["JavaScript", "TypeScript", "React", "Node.js", "Docker"],
    fr: ["JavaScript", "TypeScript", "React", "Node.js", "Docker"],
    ar: ["جافاسكريبت", "تايب سكريبت", "React", "Node.js", "Docker"],
    ja: ["JavaScript", "TypeScript", "React", "Node.js", "Docker"],
  };

  const descriptions = {
    en: ["Build scalable apps", "Collaborate with team", "Maintain APIs"],
    fr: [
      "Construire des apps scalables",
      "Collaborer en équipe",
      "Maintenir des APIs",
    ],
    ar: ["بناء تطبيقات قابلة للتوسع", "العمل مع الفريق", "صيانة APIs"],
    ja: ["スケーラブルなアプリ開発", "チームで協力", "APIの保守"],
  };

  const notesList = {
    en: ["Urgent hire", "Remote possible"],
    fr: ["Recrutement urgent", "Télétravail possible"],
    ar: ["توظيف عاجل", "عمل عن بعد ممكن"],
    ja: ["急募", "リモート可"],
  };

  const open = randomDate(new Date(2023, 0, 1), new Date(), rand);
  const close = randomDate(
    open,
    new Date(open.getTime() + 1000 * 60 * 60 * 24 * 90),
    rand,
  );

  const views = randomInt(250, 1000);
  const applicants = Math.floor(views * (0.05 + rand() * 0.15));
  const shortlisted = Math.floor(applicants * (0.2 + rand() * 0.3));
  const progress = Math.floor(shortlisted * (0.4 + rand() * 0.4));

  const overviews = [
    {
      type: "views",
      total: views,
      new: randomInt(1, 100) * randomFrom([1, -1]),
    },
    {
      type: "apps",
      total: applicants,
      new: randomInt(1, 100) * randomFrom([1, -1]),
    },
    {
      type: "shortlist",
      total: shortlisted,
      new: randomInt(1, 100) * randomFrom([1, -1]),
    },
    {
      type: "progress",
      total: progress,
      new: randomInt(1, 100) * randomFrom([1, -1]),
    },
  ];

  const junior = randomInt(10, 40);
  const mid = randomInt(20, 50);
  const senior = randomInt(10, 30);
  const distTotal = junior + mid + senior;

  return {
    id,
    overviews,
    trend: generateTrend(6),
    distribution: {
      total: distTotal,
      data: [
        { type: "junior", total: junior },
        { type: "mid", total: mid },
        { type: "senior", total: senior },
      ],
    },
    details: {
      title: mapLang((l) => randomFrom(JOB_TITLES)[l]),
      status: randomFrom(["open", "completed", "inprogress"]),
      openDate: formatDate(open),
      closeDate: formatDate(close),
      salary: rand() > 0.3 ? randomInt(30000, 120000) : null,
      skills: mapLang((l) =>
        Array.from(
          new Set(
            Array.from({ length: randomInt(3, 5) }, () =>
              randomFrom(skillsPool[l]),
            ),
          ),
        ),
      ),
      description: mapLang((l) =>
        Array.from({ length: randomInt(2, 4) }, () =>
          randomFrom(descriptions[l]),
        ),
      ),
      notes: mapLang((l) =>
        Array.from({ length: randomInt(1, 3) }, () => randomFrom(notesList[l])),
      ),
    },
  };
};

// TODO: refactor to account for all filters
export const generateVacancies = (
  page,
  filter,
  dept,
  posType,
  exp,
  loc,
  id,
) => {
  return Array.from({ length: page < 7 ? 11 : 5 }).map((_, i) => {
    const title = randomFrom(JOB_TITLES);
    return {
      id: randomInt(1, 100000),
      title,
      location: loc !== "all" ? loc : randomFrom(LOCATIONS),
      applicants: randomInt(1, 200),
      newApps: randomInt(0, 6),
      status:
        filter !== "all"
          ? filter
          : ["open", "completed", "inprogress"][Math.floor(Math.random() * 3)],
      publication: `2026-0${Math.floor(Math.random() * 8) + 1}-${String((Math.floor(Math.random() * 400) % 28) + 1).padStart(2, "0")}T10:00:00Z`,
      trend: generateSharpRandom(),
    };
  });
};

export const generateApplicants = (pageSize) => {
  return Array.from({ length: pageSize }, () => {
    const name = randomFrom(NAMES);
    return {
      id: randomInt(1, 100000),
      name,
      position: randomFrom(POSITIONS),
      date: randomDate(
        new Date(new Date().getTime() - randomInt(1, 12) * 2592000000),
        new Date(),
      ),
      status: randomInt(1, 7),
      email: randomEmail(name["en"]),
      rating: randomInt(0, 6),
    };
  });
};

export const generateSingleApplicant = (id) => {
  const name = randomFrom(NAMES);
  return {
    id,
    general: {
      name,
      status: randomFrom(INTERVIEWSTEPS),
      position: randomFrom(POSITIONS),
    },
    personal: {
      email: randomEmail(name["en"]),
      phone: randomFrom(PHONENUMBERS[randomFrom(LOCATIONS)]),
      linkedin: `/in/${name["en"].replace(/\s/g, "")}`,
      appliedDate: randomDate(undefined, undefined, () => -1),
    },
    educations: Array.from({ length: randomInt(1, 4) }, () => {
      return {
        school: randomFrom(SCHOOLS),
        degree: randomFrom(DEGREES),
        graduated: randomDate(undefined, undefined, () => -1),
      };
    }),
    experiences: Array.from({ length: randomInt(1, 4) }, () => {
      const startDate = randomDate(undefined, undefined, () => -1);
      return {
        position: randomFrom(POSITIONS), // Position at job
        company: randomFrom(COMPANIES), // company name
        tasks: Array.from({ length: randomInt(1, 5) }, () => randomFrom(TASKS)), // Tasks done at this job,
        location: randomFrom(LOCATIONS),
        startDate, // start date
        endDate: randomDate(startDate, undefined, () => 1), // if null, currently still working
      };
    }),
    skills: SKILLSPOOL.sort(() => Math.random() - 0.5).slice(
      0,
      randomInt(5, SKILLSPOOL.length),
    ),
  };
};

export const generateApplicantsOverview = () => {
  return {
    open: {
      total: randomInt(100, 200),
      trend: Array.from({ length: 7 }, () => randomInt(1, 20)),
      new: randomInt(1, 10),
    },
    active: {
      total: randomInt(50, 100),
      trend: Array.from({ length: 7 }, () => randomInt(1, 20)),
      new: randomInt(1, 10),
    },
    hiring: {
      average: randomInt(10, 50),
      trend: Array.from({ length: 7 }, () => randomInt(1, 20)),
      stages: randomInt(1, 10),
    },
    candidate: {
      average: randomInt(10, 50),
      trend: Array.from({ length: 7 }, () => randomInt(1, 20)),
      percentage: randomInt(1, 100),
    },
  };
};

export const generateEmployees = (pageSize) => {
  return Array.from({ length: pageSize }, () => {
    return {
      id: randomInt(1, 100000),
      name: randomFrom(NAMES),
      profilePicture: randomPicture(),
      position: randomFrom(POSITIONS),
      department: randomFrom(DEPARTMENTS),
      status: randomFrom(EMPLOYEE_STATUS),
      joinDate: randomDate(undefined, undefined, () => -1),
      email: randomEmail(randomFrom(NAMES)["en"]),
      phoneNumber: randomFrom(PHONENUMBERS[randomFrom(LOCATIONS)]),
    };
  });
};

export const generateSingleEmployee = (id) => {
  return {
    id,
    name: randomFrom(NAMES),
    position: randomFrom(POSITIONS),
    department: randomFrom(DEPARTMENTS),
    joinDate: randomDate(undefined, undefined, () => -1),
    email: randomEmail(randomFrom(NAMES)["en"]),
    phoneNumber: randomFrom(PHONENUMBERS[randomFrom(LOCATIONS)]),
    passport: generateFakePassport(),
    passportExp: randomDate(undefined, undefined, () => 2),
    birthDate: randomDate(undefined, undefined, () => 5),
    marital: randomFrom(["single", "married", "divorced", "widowed"]),
    bankAcc: generateFakeBankAcc(),
    ifscCode: generateFakeIFSC(),
    panNb: generateFakePAN(),
    salaryBasis: randomFrom(["hour", "day", "week", "month", "year"]),
    salaryAmount: randomInt(100, 100000),
    lastPayout: randomDate(undefined, undefined, () => -1),
    payoutType: randomFrom(["transfer", "wire", "cash", "check"]),
    billRate: randomInt(1, 100),
    experiences: Array.from({ length: randomInt(1, 4) }, () => {
      return {
        position: randomFrom(POSITIONS),
        company: randomFrom(COMPANIES),
        tasks: Array.from({ length: randomInt(1, 5) }, () => randomFrom(TASKS)),
        location: randomFrom(LOCATIONS),
        startDate: randomDate(undefined, undefined, () => -1),
        endDate: randomDate(undefined, undefined, () => 1),
      };
    }),
    education: Array.from({ length: randomInt(1, 3) }, () => {
      return {
        school: randomFrom(SCHOOLS),
        degree: randomFrom(DEGREES),
        graduated: "20" + randomInt(1, 2) + randomInt(1, 9),
      };
    }),
    skills: SKILLSPOOL.sort(() => Math.random() - 0.5).slice(
      randomInt(5, SKILLSPOOL.length),
    ),
    activeProjects: [randomFrom(ACTIVEPROJECTS), randomFrom(ACTIVEPROJECTS)],
  };
};

export const generatePayrolls = (pageSize) => {
  return Array.from({ length: pageSize }, () => {
    const name = randomFrom(NAMES);
    return {
      id: randomInt(1, 100000),
      name,
      email: randomEmail(name["en"]),
      profilePic: randomPicture(),
      position: randomFrom(POSITIONS),
      rateType: randomFrom(["f", "h", "d", "w", "m", "y"]),
      period: [
        randomDate(undefined, undefined, () => -1),
        randomDate(undefined, undefined, () => -0.5),
      ],
      jobType: randomFrom(["full", "part", "contract"]),
      salary: randomInt(10000, 1000000),
      status: randomFrom(["progress", "pending", "completed", "rejected"]),
    };
  });
};

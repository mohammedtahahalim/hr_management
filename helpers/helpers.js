import { NAMES } from "../helpers/data/names.js";
import { POSITIONS } from "../helpers/data/positions.js";
import { OFFER_STATES } from "../helpers/data/offerStates.js";
import { DEPARTMENTS } from "../helpers/data/departments.js";
import { JOB_TITLES } from "../helpers/data/jobTitles.js";
import { LOCATIONS } from "../helpers/data/countries.js";
import { ACTIVITIES } from "../helpers/data/activities.js";
import { IMAGE_SEED, LANGS } from "./constants.js";

const randomInt = (min, max) => min + Math.floor(Math.random() * (max - min));

const randomFrom = (arr) => arr[randomInt(0, arr.length)];

const randomDate = (start, end, rand) =>
  new Date(start.getTime() + rand() * (end.getTime() - start.getTime()));

const formatDate = (date) => date.toISOString();

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

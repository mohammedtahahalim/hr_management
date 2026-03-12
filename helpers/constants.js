export const allowedQueries = {
  dashboard: [
    "candidate",
    "departments",
    "distribution",
    "recent",
    "collection",
    "activity",
  ],
};

const names = [
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

const positions = [
  {
    en: "Frontend Developer",
    ja: "フロントエンド開発者",
    ar: "مطور واجهات أمامية",
    fr: "Développeur Frontend",
  },
  {
    en: "Frontend Engineer",
    ja: "フロントエンドエンジニア",
    ar: "مهندس الواجهة الأمامية",
    fr: "Ingénieur Frontend",
  },
  {
    en: "Backend Engineer",
    ja: "バックエンドエンジニア",
    ar: "مهندس خلفية",
    fr: "Ingénieur Backend",
  },
  {
    en: "Backend Developer",
    ja: "バックエンド開発者",
    ar: "مطور الواجهة الخلفية",
    fr: "Développeur Backend",
  },
  {
    en: "Product Manager",
    ja: "プロダクトマネージャー",
    ar: "مدير منتج",
    fr: "Chef de Produit",
  },
  {
    en: "UI/UX Designer",
    ja: "UI/UXデザイナー",
    ar: "مصمم واجهات وتجربة مستخدم",
    fr: "Designer UI/UX",
  },
  {
    en: "DevOps Engineer",
    ja: "DevOpsエンジニア",
    ar: "مهندس ديف أوبس",
    fr: "Ingénieur DevOps",
  },
  {
    en: "Data Manager",
    ja: "データマネージャー",
    ar: "مدير البيانات",
    fr: "Gestionnaire de données",
  },
];

const offerStates = ["OFFER", "SHORTLIST", "REJECT", "PENDING"];

export const generateCandidates = (
  count = Math.floor(Math.random() * 100) + 300,
) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    name: names[Math.floor(Math.random() * names.length)],
    position: positions[Math.floor(Math.random() * positions.length)],
    offerState: offerStates[Math.floor(Math.random() * offerStates.length)],
  }));

export const generateRandomImage = () => {
  return `https://api.dicebear.com/9.x/avataaars/svg?seed=${names[Math.floor(Math.random() * names.length)]}`;
};

export const generateDepartments = () => {
  return [
    {
      departmentName: "development",
      data: Array.from({ length: 4 }, () => generateRandomImage()),
      newApps: 2,
    },
    {
      departmentName: "sales",
      data: Array.from({ length: 4 }, () => generateRandomImage()),
      newApps: 0,
    },
    {
      departmentName: "management",
      data: Array.from({ length: 4 }, () => generateRandomImage()),
      newApps: 3,
    },
    {
      departmentName: "analytics",
      data: Array.from({ length: 4 }, () => generateRandomImage()),
      newApps: 4,
    },
    {
      departmentName: "finance",
      data: Array.from({ length: 4 }, () => generateRandomImage()),
      newApps: 0,
    },
    {
      departmentName: "data",
      data: Array.from({ length: 4 }, () => generateRandomImage()),
      newApps: 1,
    },
    {
      departmentName: "hr",
      data: Array.from({ length: 4 }, () => generateRandomImage()),
      newApps: 1,
    },
  ];
};

export const generateDistributions = () => ({
  total: Math.floor(Math.random() * 100) + 300,
  distributions: [
    {
      deptName: "development",
      percentage: 35,
    },
    {
      deptName: "sales",
      percentage: 5,
    },
    {
      deptName: "management",
      percentage: 7,
    },
    {
      deptName: "analytics",
      percentage: 13,
    },
    {
      deptName: "finance",
      percentage: 2,
    },
    {
      deptName: "data",
      percentage: 20,
    },
    {
      deptName: "hr",
      percentage: 18,
    },
  ],
});

export const allowedFilters = ["open", "completed", "inprogress", "all"];

export const generateSharpRandomSeries = (
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

    result.push(value);
  }

  return result;
};

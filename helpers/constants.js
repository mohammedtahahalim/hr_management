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
    en: "Backend Engineer",
    ja: "バックエンドエンジニア",
    ar: "مهندس خلفية",
    fr: "Ingénieur Backend",
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
];

const offerStates = ["OFFER", "SHORTLIST", "REJECT", "PENDING"];

export const generateCandidates = (count = 318) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    name: names[Math.floor(Math.random() * names.length)],
    position: positions[Math.floor(Math.random() * positions.length)],
    offerState: offerStates[Math.floor(Math.random() * offerStates.length)],
  }));

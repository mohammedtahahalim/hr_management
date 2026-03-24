import { generateSharpRandomSeries } from "./constants.js";

export const enNotifications = [
  {
    id: 1,
    title: "New message from support",
    read: false,
    readAt: null,
  },
  {
    id: 2,
    title: "Your password was updated successfully",
    read: true,
    readAt: "2026-02-20T09:15:00Z",
  },
  {
    id: 3,
    title: "New login detected from Chrome on Linux",
    read: true,
    readAt: "2026-02-18T18:42:31Z",
  },
  {
    id: 4,
    title: "Weekly activity summary is ready",
    read: false,
    readAt: null,
  },
  {
    id: 5,
    title: "Payment received for invoice #4821",
    read: true,
    readAt: "2026-02-17T14:03:12Z",
  },
  {
    id: 6,
    title: "Subscription will renew in 3 days",
    read: false,
    readAt: null,
  },
  {
    id: 7,
    title: "New comment on your post",
    read: true,
    readAt: "2026-02-16T11:27:45Z",
  },
  {
    id: 8,
    title: "Two-factor authentication enabled",
    read: true,
    readAt: "2026-02-15T20:10:05Z",
  },
  {
    id: 9,
    title: "Storage usage is nearing limit",
    read: false,
    readAt: null,
  },
  {
    id: 10,
    title: "Profile information updated",
    read: true,
    readAt: "2026-02-14T08:55:19Z",
  },
  {
    id: 11,
    title: "New device connected to your account",
    read: false,
    readAt: null,
  },
  {
    id: 12,
    title: "Maintenance scheduled for this weekend",
    read: true,
    readAt: "2026-02-13T16:22:48Z",
  },
];

export const jaNotifications = [
  { id: 1, title: "サポートからの新しいメッセージ", read: false, readAt: null },
  {
    id: 2,
    title: "パスワードが正常に更新されました",
    read: true,
    readAt: "2026-02-20T09:15:00Z",
  },
  {
    id: 3,
    title: "Linux上のChromeからの新しいログインが検出されました",
    read: true,
    readAt: "2026-02-18T18:42:31Z",
  },
  {
    id: 4,
    title: "週間アクティビティの概要が準備できました",
    read: false,
    readAt: null,
  },
  {
    id: 5,
    title: "請求書 #4821 の支払いを受け取りました",
    read: true,
    readAt: "2026-02-17T14:03:12Z",
  },
  {
    id: 6,
    title: "サブスクリプションは3日後に更新されます",
    read: false,
    readAt: null,
  },
  {
    id: 7,
    title: "あなたの投稿に新しいコメントがあります",
    read: true,
    readAt: "2026-02-16T11:27:45Z",
  },
  {
    id: 8,
    title: "二段階認証が有効になりました",
    read: true,
    readAt: "2026-02-15T20:10:05Z",
  },
  {
    id: 9,
    title: "ストレージの使用量が上限に近づいています",
    read: false,
    readAt: null,
  },
  {
    id: 10,
    title: "プロフィール情報が更新されました",
    read: true,
    readAt: "2026-02-14T08:55:19Z",
  },
  {
    id: 11,
    title: "新しいデバイスがあなたのアカウントに接続されました",
    read: false,
    readAt: null,
  },
  {
    id: 12,
    title: "今週末にメンテナンスが予定されています",
    read: true,
    readAt: "2026-02-13T16:22:48Z",
  },
];

export const arNotifications = [
  { id: 1, title: "رسالة جديدة من الدعم", read: false, readAt: null },
  {
    id: 2,
    title: "تم تحديث كلمة المرور بنجاح",
    read: true,
    readAt: "2026-02-20T09:15:00Z",
  },
  {
    id: 3,
    title: "تم اكتشاف تسجيل دخول جديد من Chrome على Linux",
    read: true,
    readAt: "2026-02-18T18:42:31Z",
  },
  { id: 4, title: "ملخص النشاط الأسبوعي جاهز", read: false, readAt: null },
  {
    id: 5,
    title: "تم استلام الدفع للفاتورة رقم #4821",
    read: true,
    readAt: "2026-02-17T14:03:12Z",
  },
  {
    id: 6,
    title: "سيتم تجديد الاشتراك خلال 3 أيام",
    read: false,
    readAt: null,
  },
  {
    id: 7,
    title: "تعليق جديد على منشورك",
    read: true,
    readAt: "2026-02-16T11:27:45Z",
  },
  {
    id: 8,
    title: "تم تفعيل المصادقة الثنائية",
    read: true,
    readAt: "2026-02-15T20:10:05Z",
  },
  {
    id: 9,
    title: "استخدام التخزين يقترب من الحد الأقصى",
    read: false,
    readAt: null,
  },
  {
    id: 10,
    title: "تم تحديث معلومات الملف الشخصي",
    read: true,
    readAt: "2026-02-14T08:55:19Z",
  },
  { id: 11, title: "تم توصيل جهاز جديد بحسابك", read: false, readAt: null },
  {
    id: 12,
    title: "تمت جدولة صيانة في عطلة نهاية الأسبوع",
    read: true,
    readAt: "2026-02-13T16:22:48Z",
  },
];

export const frNotifications = [
  { id: 1, title: "Nouveau message du support", read: false, readAt: null },
  {
    id: 2,
    title: "Votre mot de passe a été mis à jour avec succès",
    read: true,
    readAt: "2026-02-20T09:15:00Z",
  },
  {
    id: 3,
    title: "Nouvelle connexion détectée depuis Chrome sur Linux",
    read: true,
    readAt: "2026-02-18T18:42:31Z",
  },
  {
    id: 4,
    title: "Le résumé d’activité hebdomadaire est prêt",
    read: false,
    readAt: null,
  },
  {
    id: 5,
    title: "Paiement reçu pour la facture n°4821",
    read: true,
    readAt: "2026-02-17T14:03:12Z",
  },
  {
    id: 6,
    title: "L’abonnement sera renouvelé dans 3 jours",
    read: false,
    readAt: null,
  },
  {
    id: 7,
    title: "Nouveau commentaire sur votre publication",
    read: true,
    readAt: "2026-02-16T11:27:45Z",
  },
  {
    id: 8,
    title: "Authentification à deux facteurs activée",
    read: true,
    readAt: "2026-02-15T20:10:05Z",
  },
  {
    id: 9,
    title: "L’espace de stockage approche de la limite",
    read: false,
    readAt: null,
  },
  {
    id: 10,
    title: "Informations du profil mises à jour",
    read: true,
    readAt: "2026-02-14T08:55:19Z",
  },
  {
    id: 11,
    title: "Un nouvel appareil est connecté à votre compte",
    read: false,
    readAt: null,
  },
  {
    id: 12,
    title: "Maintenance prévue ce week-end",
    read: true,
    readAt: "2026-02-13T16:22:48Z",
  },
];

export const candidates = [
  {
    id: 1,
    name: "Emma Johnson",
    position: "Frontend Developer",
    offerState: "SHORTLIST",
  },
  {
    id: 2,
    name: "Liam Smith",
    position: "Backend Developer",
    offerState: "PENDING",
  },
  {
    id: 3,
    name: "Olivia Brown",
    position: "UI/UX Designer",
    offerState: "OFFER",
  },
  {
    id: 4,
    name: "Noah Garcia",
    position: "DevOps Engineer",
    offerState: "REJECT",
  },
  {
    id: 5,
    name: "Ava Martinez",
    position: "QA Engineer",
    offerState: "SHORTLIST",
  },
  {
    id: 6,
    name: "William Davis",
    position: "Full Stack Developer",
    offerState: "PENDING",
  },
  {
    id: 7,
    name: "Sophia Rodriguez",
    position: "Product Manager",
    offerState: "OFFER",
  },
  {
    id: 8,
    name: "James Wilson",
    position: "Data Analyst",
    offerState: "REJECT",
  },
  {
    id: 9,
    name: "Isabella Anderson",
    position: "Mobile Developer",
    offerState: "SHORTLIST",
  },
  {
    id: 10,
    name: "Benjamin Thomas",
    position: "Cloud Engineer",
    offerState: "PENDING",
  },
  {
    id: 11,
    name: "Mia Taylor",
    position: "Frontend Developer",
    offerState: "OFFER",
  },
  {
    id: 12,
    name: "Lucas Moore",
    position: "Backend Developer",
    offerState: "SHORTLIST",
  },
  {
    id: 13,
    name: "Charlotte Jackson",
    position: "HR Specialist",
    offerState: "REJECT",
  },
  {
    id: 14,
    name: "Henry Martin",
    position: "Security Engineer",
    offerState: "PENDING",
  },
  {
    id: 15,
    name: "Amelia Lee",
    position: "UI/UX Designer",
    offerState: "SHORTLIST",
  },
  {
    id: 16,
    name: "Alexander Perez",
    position: "Data Scientist",
    offerState: "OFFER",
  },
  {
    id: 17,
    name: "Harper Thompson",
    position: "Scrum Master",
    offerState: "PENDING",
  },
  {
    id: 18,
    name: "Daniel White",
    position: "QA Engineer",
    offerState: "REJECT",
  },
  {
    id: 19,
    name: "Evelyn Harris",
    position: "Full Stack Developer",
    offerState: "SHORTLIST",
  },
  {
    id: 20,
    name: "Michael Sanchez",
    position: "DevOps Engineer",
    offerState: "OFFER",
  },
  {
    id: 21,
    name: "Abigail Clark",
    position: "Frontend Developer",
    offerState: "PENDING",
  },
  {
    id: 22,
    name: "Matthew Ramirez",
    position: "Backend Developer",
    offerState: "SHORTLIST",
  },
  {
    id: 23,
    name: "Emily Lewis",
    position: "Product Manager",
    offerState: "REJECT",
  },
  {
    id: 24,
    name: "David Robinson",
    position: "Cloud Engineer",
    offerState: "OFFER",
  },
  {
    id: 25,
    name: "Ella Walker",
    position: "UI/UX Designer",
    offerState: "SHORTLIST",
  },
  {
    id: 26,
    name: "Joseph Young",
    position: "Mobile Developer",
    offerState: "PENDING",
  },
  {
    id: 27,
    name: "Avery Allen",
    position: "Data Analyst",
    offerState: "REJECT",
  },
  {
    id: 28,
    name: "Samuel King",
    position: "Security Engineer",
    offerState: "SHORTLIST",
  },
  {
    id: 29,
    name: "Scarlett Wright",
    position: "QA Engineer",
    offerState: "OFFER",
  },
  {
    id: 30,
    name: "Sebastian Scott",
    position: "Full Stack Developer",
    offerState: "PENDING",
  },

  {
    id: 31,
    name: "Grace Green",
    position: "Frontend Developer",
    offerState: "SHORTLIST",
  },
  {
    id: 32,
    name: "Jack Baker",
    position: "Backend Developer",
    offerState: "REJECT",
  },
  {
    id: 33,
    name: "Chloe Adams",
    position: "Data Scientist",
    offerState: "OFFER",
  },
  {
    id: 34,
    name: "Owen Nelson",
    position: "DevOps Engineer",
    offerState: "PENDING",
  },
  {
    id: 35,
    name: "Lily Carter",
    position: "Product Manager",
    offerState: "SHORTLIST",
  },
  {
    id: 36,
    name: "Gabriel Mitchell",
    position: "Cloud Engineer",
    offerState: "REJECT",
  },
  {
    id: 37,
    name: "Zoey Perez",
    position: "UI/UX Designer",
    offerState: "OFFER",
  },
  {
    id: 38,
    name: "Carter Roberts",
    position: "QA Engineer",
    offerState: "PENDING",
  },
  {
    id: 39,
    name: "Riley Turner",
    position: "Full Stack Developer",
    offerState: "SHORTLIST",
  },
  {
    id: 40,
    name: "Julian Phillips",
    position: "Mobile Developer",
    offerState: "REJECT",
  },

  {
    id: 41,
    name: "Nora Campbell",
    position: "Frontend Developer",
    offerState: "OFFER",
  },
  {
    id: 42,
    name: "Isaac Parker",
    position: "Backend Developer",
    offerState: "PENDING",
  },
  {
    id: 43,
    name: "Hannah Evans",
    position: "HR Specialist",
    offerState: "SHORTLIST",
  },
  {
    id: 44,
    name: "Anthony Edwards",
    position: "Security Engineer",
    offerState: "REJECT",
  },
  {
    id: 45,
    name: "Aria Collins",
    position: "Data Analyst",
    offerState: "OFFER",
  },
  {
    id: 46,
    name: "Christopher Stewart",
    position: "DevOps Engineer",
    offerState: "SHORTLIST",
  },
  {
    id: 47,
    name: "Layla Morris",
    position: "UI/UX Designer",
    offerState: "PENDING",
  },
  {
    id: 48,
    name: "Andrew Rogers",
    position: "Full Stack Developer",
    offerState: "REJECT",
  },
  {
    id: 49,
    name: "Camila Reed",
    position: "Product Manager",
    offerState: "SHORTLIST",
  },
  { id: 50, name: "Joshua Cook", position: "QA Engineer", offerState: "OFFER" },

  {
    id: 51,
    name: "Victoria Morgan",
    position: "Cloud Engineer",
    offerState: "PENDING",
  },
  {
    id: 52,
    name: "Nathan Bell",
    position: "Frontend Developer",
    offerState: "REJECT",
  },
  {
    id: 53,
    name: "Madison Murphy",
    position: "Backend Developer",
    offerState: "SHORTLIST",
  },
  {
    id: 54,
    name: "Ryan Bailey",
    position: "Data Scientist",
    offerState: "OFFER",
  },
  {
    id: 55,
    name: "Zoe Rivera",
    position: "Mobile Developer",
    offerState: "PENDING",
  },
  {
    id: 56,
    name: "Aaron Cooper",
    position: "DevOps Engineer",
    offerState: "SHORTLIST",
  },
  {
    id: 57,
    name: "Penelope Richardson",
    position: "UI/UX Designer",
    offerState: "REJECT",
  },
  {
    id: 58,
    name: "Adam Cox",
    position: "Security Engineer",
    offerState: "OFFER",
  },
  {
    id: 59,
    name: "Stella Howard",
    position: "Product Manager",
    offerState: "PENDING",
  },
  {
    id: 60,
    name: "Thomas Ward",
    position: "QA Engineer",
    offerState: "SHORTLIST",
  },

  // Continuing same structure up to 150

  {
    id: 61,
    name: "Lucy Torres",
    position: "Frontend Developer",
    offerState: "OFFER",
  },
  {
    id: 62,
    name: "Charles Peterson",
    position: "Backend Developer",
    offerState: "PENDING",
  },
  {
    id: 63,
    name: "Paisley Gray",
    position: "Cloud Engineer",
    offerState: "SHORTLIST",
  },
  {
    id: 64,
    name: "Isaiah Ramirez",
    position: "Data Analyst",
    offerState: "REJECT",
  },
  {
    id: 65,
    name: "Violet James",
    position: "UI/UX Designer",
    offerState: "OFFER",
  },
  {
    id: 66,
    name: "Josiah Watson",
    position: "Full Stack Developer",
    offerState: "PENDING",
  },
  {
    id: 67,
    name: "Claire Brooks",
    position: "QA Engineer",
    offerState: "SHORTLIST",
  },
  {
    id: 68,
    name: "Eli Kelly",
    position: "DevOps Engineer",
    offerState: "REJECT",
  },
  {
    id: 69,
    name: "Skylar Sanders",
    position: "Product Manager",
    offerState: "OFFER",
  },
  {
    id: 70,
    name: "Christian Price",
    position: "Mobile Developer",
    offerState: "PENDING",
  },

  {
    id: 71,
    name: "Bella Bennett",
    position: "Frontend Developer",
    offerState: "SHORTLIST",
  },
  {
    id: 72,
    name: "Jonathan Wood",
    position: "Backend Developer",
    offerState: "REJECT",
  },
  {
    id: 73,
    name: "Aurora Barnes",
    position: "Security Engineer",
    offerState: "OFFER",
  },
  {
    id: 74,
    name: "Colton Ross",
    position: "Cloud Engineer",
    offerState: "PENDING",
  },
  {
    id: 75,
    name: "Naomi Henderson",
    position: "Data Scientist",
    offerState: "SHORTLIST",
  },

  {
    id: 76,
    name: "Robert Coleman",
    position: "QA Engineer",
    offerState: "OFFER",
  },
  {
    id: 77,
    name: "Elena Jenkins",
    position: "UI/UX Designer",
    offerState: "PENDING",
  },
  {
    id: 78,
    name: "Tyler Perry",
    position: "Full Stack Developer",
    offerState: "SHORTLIST",
  },
  {
    id: 79,
    name: "Maya Powell",
    position: "Frontend Developer",
    offerState: "REJECT",
  },
  {
    id: 80,
    name: "Brandon Long",
    position: "Backend Developer",
    offerState: "OFFER",
  },

  {
    id: 81,
    name: "Luna Patterson",
    position: "Mobile Developer",
    offerState: "PENDING",
  },
  {
    id: 82,
    name: "Kevin Hughes",
    position: "DevOps Engineer",
    offerState: "SHORTLIST",
  },
  {
    id: 83,
    name: "Ruby Flores",
    position: "Product Manager",
    offerState: "REJECT",
  },
  {
    id: 84,
    name: "Justin Washington",
    position: "Cloud Engineer",
    offerState: "OFFER",
  },
  {
    id: 85,
    name: "Alice Butler",
    position: "Data Analyst",
    offerState: "PENDING",
  },

  {
    id: 86,
    name: "Leo Simmons",
    position: "Security Engineer",
    offerState: "SHORTLIST",
  },
  {
    id: 87,
    name: "Eva Foster",
    position: "UI/UX Designer",
    offerState: "OFFER",
  },
  {
    id: 88,
    name: "Jason Gonzales",
    position: "QA Engineer",
    offerState: "REJECT",
  },
  {
    id: 89,
    name: "Autumn Bryant",
    position: "Frontend Developer",
    offerState: "PENDING",
  },
  {
    id: 90,
    name: "Aaron Alexander",
    position: "Backend Developer",
    offerState: "SHORTLIST",
  },

  {
    id: 91,
    name: "Kennedy Russell",
    position: "Data Scientist",
    offerState: "OFFER",
  },
  {
    id: 92,
    name: "Jordan Griffin",
    position: "DevOps Engineer",
    offerState: "PENDING",
  },
  {
    id: 93,
    name: "Sadie Diaz",
    position: "Full Stack Developer",
    offerState: "SHORTLIST",
  },
  {
    id: 94,
    name: "Ian Hayes",
    position: "Mobile Developer",
    offerState: "REJECT",
  },
  {
    id: 95,
    name: "Caroline Myers",
    position: "Product Manager",
    offerState: "OFFER",
  },

  {
    id: 96,
    name: "Xavier Ford",
    position: "Cloud Engineer",
    offerState: "PENDING",
  },
  {
    id: 97,
    name: "Genesis Hamilton",
    position: "QA Engineer",
    offerState: "SHORTLIST",
  },
  {
    id: 98,
    name: "Miles Graham",
    position: "Frontend Developer",
    offerState: "REJECT",
  },
  {
    id: 99,
    name: "Ariana Sullivan",
    position: "UI/UX Designer",
    offerState: "OFFER",
  },
  {
    id: 100,
    name: "Dominic Wallace",
    position: "Backend Developer",
    offerState: "PENDING",
  },

  {
    id: 101,
    name: "Valeria Woods",
    position: "Security Engineer",
    offerState: "SHORTLIST",
  },
  {
    id: 102,
    name: "Ethan Cole",
    position: "Data Analyst",
    offerState: "OFFER",
  },
  {
    id: 103,
    name: "Melanie West",
    position: "DevOps Engineer",
    offerState: "PENDING",
  },
  {
    id: 104,
    name: "Caleb Jordan",
    position: "Full Stack Developer",
    offerState: "REJECT",
  },
  {
    id: 105,
    name: "Hazel Owens",
    position: "Frontend Developer",
    offerState: "OFFER",
  },

  {
    id: 106,
    name: "Nicholas Reynolds",
    position: "Backend Developer",
    offerState: "SHORTLIST",
  },
  {
    id: 107,
    name: "Aurora Fisher",
    position: "Product Manager",
    offerState: "PENDING",
  },
  {
    id: 108,
    name: "Zachary Ellis",
    position: "Cloud Engineer",
    offerState: "REJECT",
  },
  {
    id: 109,
    name: "Savannah Harrison",
    position: "UI/UX Designer",
    offerState: "OFFER",
  },
  {
    id: 110,
    name: "Connor Gibson",
    position: "QA Engineer",
    offerState: "SHORTLIST",
  },

  {
    id: 111,
    name: "Brooklyn McDonald",
    position: "Mobile Developer",
    offerState: "PENDING",
  },
  {
    id: 112,
    name: "Hunter Cruz",
    position: "DevOps Engineer",
    offerState: "OFFER",
  },
  {
    id: 113,
    name: "Natalie Marshall",
    position: "Data Scientist",
    offerState: "SHORTLIST",
  },
  {
    id: 114,
    name: "Adrian Ortiz",
    position: "Security Engineer",
    offerState: "REJECT",
  },
  {
    id: 115,
    name: "Leah Gomez",
    position: "Frontend Developer",
    offerState: "OFFER",
  },

  {
    id: 116,
    name: "Jeremiah Murray",
    position: "Backend Developer",
    offerState: "PENDING",
  },
  {
    id: 117,
    name: "Everly Freeman",
    position: "Product Manager",
    offerState: "SHORTLIST",
  },
  {
    id: 118,
    name: "Angel Kim",
    position: "Cloud Engineer",
    offerState: "REJECT",
  },
  {
    id: 119,
    name: "Kinsley Webb",
    position: "UI/UX Designer",
    offerState: "OFFER",
  },
  {
    id: 120,
    name: "Tristan Simpson",
    position: "Full Stack Developer",
    offerState: "PENDING",
  },

  {
    id: 121,
    name: "Peyton Stevens",
    position: "QA Engineer",
    offerState: "SHORTLIST",
  },
  {
    id: 122,
    name: "Blake Tucker",
    position: "Mobile Developer",
    offerState: "OFFER",
  },
  {
    id: 123,
    name: "Delilah Porter",
    position: "Data Analyst",
    offerState: "PENDING",
  },
  {
    id: 124,
    name: "Grant Hunter",
    position: "DevOps Engineer",
    offerState: "REJECT",
  },
  {
    id: 125,
    name: "Rose Hicks",
    position: "Frontend Developer",
    offerState: "OFFER",
  },

  {
    id: 126,
    name: "Eric Crawford",
    position: "Backend Developer",
    offerState: "SHORTLIST",
  },
  {
    id: 127,
    name: "Sienna Henry",
    position: "Cloud Engineer",
    offerState: "PENDING",
  },
  {
    id: 128,
    name: "Maxwell Boyd",
    position: "Security Engineer",
    offerState: "OFFER",
  },
  {
    id: 129,
    name: "Eliza Mason",
    position: "Product Manager",
    offerState: "REJECT",
  },
  {
    id: 130,
    name: "Cole Morales",
    position: "QA Engineer",
    offerState: "SHORTLIST",
  },

  {
    id: 131,
    name: "Margaret Kennedy",
    position: "UI/UX Designer",
    offerState: "OFFER",
  },
  {
    id: 132,
    name: "Dean Warren",
    position: "Full Stack Developer",
    offerState: "PENDING",
  },
  {
    id: 133,
    name: "Faith Dixon",
    position: "Frontend Developer",
    offerState: "SHORTLIST",
  },
  {
    id: 134,
    name: "Oscar Ramos",
    position: "Backend Developer",
    offerState: "REJECT",
  },
];

export const recentJobs = [
  {
    id: 1,
    jobTitle: {
      en: "UX Designer",
      ja: "UXデザイナー",
      ar: "مصمم تجربة",
      fr: "Concepteur UX",
    },
    location: "DT",
    totalApps: 122,
    trend: generateSharpRandomSeries(),
  },
  {
    id: 2,
    jobTitle: {
      en: "iOS App Developer",
      ja: "iOS開発者",
      ar: "مطور iOS",
      fr: "Développeur iOS",
    },
    location: "R",
    totalApps: 34,
    trend: generateSharpRandomSeries(),
  },
  {
    id: 3,
    jobTitle: {
      en: "Network Administrator",
      ja: "ネットワーク管理者",
      ar: "مسؤول الشبكة",
      fr: "Administrateur réseau",
    },
    location: "PH",
    totalApps: 45,
    trend: generateSharpRandomSeries(),
  },
  {
    id: 4,
    jobTitle: {
      en: "React Developer",
      ja: "React開発者",
      ar: "مطور React",
      fr: "Développeur React",
    },
    location: "R",
    totalApps: 57,
    trend: generateSharpRandomSeries(),
  },
  {
    id: 5,
    jobTitle: {
      en: "Node Developer",
      ja: "ノード開発者",
      ar: "مطور Node",
      fr: "Développeur Node",
    },
    location: "JP",
    totalApps: 38,
    trend: generateSharpRandomSeries(),
  },
  {
    id: 6,
    jobTitle: {
      en: "Graphic Designer",
      ja: "グラフィックデザイナー",
      ar: "مصمم جرافيك",
      fr: "graphiste",
    },
    location: "GB",
    totalApps: 74,
    trend: generateSharpRandomSeries(),
  },
  {
    id: 7,
    jobTitle: {
      en: "Python Developer",
      ja: "Python開発者",
      ar: "مطور بايثون",
      fr: "Développeur Python",
    },
    location: "R",
    totalApps: 44,
    trend: generateSharpRandomSeries(),
  },
  {
    id: 8,
    jobTitle: {
      en: "Frontend Developer",
      ja: "フロントエンド開発者",
      ar: "مطور واجهات",
      fr: "Développeur Frontend",
    },
    location: "H",
    totalApps: 52,
    trend: generateSharpRandomSeries(),
  },
  {
    id: 9,
    jobTitle: {
      en: "Backend Engineer",
      ja: "バックエンドエンジニア",
      ar: "مهندس خلفية",
      fr: "Ingénieur Backend",
    },
    location: "R",
    totalApps: 38,
    trend: generateSharpRandomSeries(),
  },
  {
    id: 10,
    jobTitle: {
      en: "DevOps Engineer",
      ja: "DevOpsエンジニア",
      ar: "مهندس ديف أوبس",
      fr: "Ingénieur DevOps",
    },
    location: "H",
    totalApps: 27,
    trend: generateSharpRandomSeries(),
  },
  {
    id: 11,
    jobTitle: {
      en: "Data Analyst",
      ja: "データアナリスト",
      ar: "محلل بيانات",
      fr: "Analyste de données",
    },
    location: "R",
    totalApps: 31,
    trend: generateSharpRandomSeries(),
  },
  {
    id: 12,
    jobTitle: {
      en: "UI/UX Designer",
      ja: "UI/UXデザイナー",
      ar: "مصمم واجهات",
      fr: "Designer UI/UX",
    },
    location: "H",
    totalApps: 19,
    trend: generateSharpRandomSeries(),
  },
  {
    id: 13,
    jobTitle: {
      en: "Mobile Developer",
      ja: "モバイル開発者",
      ar: "مطور الهاتف",
      fr: "Développeur Mobile",
    },
    location: "R",
    totalApps: 23,
    trend: generateSharpRandomSeries(),
  },
];

export const collections = {
  insource: Array.from(
    { length: 10 },
    () => Math.floor(Math.random() * 50) + 20,
  ),
  outsource: Array.from(
    { length: 10 },
    () => Math.floor(Math.random() * 50) + 20,
  ),
};

export const activities = [
  {
    id: 0,
    date: "12-01",
    title: {
      en: "Community Cleanup",
      ar: "تنظيف المجتمع",
      ja: "地域清掃",
      fr: "Nettoyage communautaire",
    },
    content: {
      en: "Clean the local park and streets.",
      ar: "نظفوا الحديقة والشوارع المحلية.",
      ja: "地元の公園や道路を掃除します。",
      fr: "Nettoyez le parc et les rues du quartier.",
    },
  },
  {
    id: 1,
    date: "14-02",
    title: {
      en: "Art Workshop",
      ar: "ورشة فنية",
      ja: "アートワークショップ",
      fr: "Atelier d’art",
    },
    content: {
      en: "Create paintings with acrylic colors.",
      ar: "ارسم لوحات باستخدام ألوان الأكريليك.",
      ja: "アクリル絵の具を使って絵画を描きます。",
      fr: "Créez des tableaux avec couleurs acryliques.",
    },
  },
  {
    id: 2,
    date: "16-03",
    title: {
      en: "Book Club Meeting",
      ar: "اجتماع نادي القراءة",
      ja: "読書クラブ会議",
      fr: "Réunion du club de lecture",
    },
    content: {
      en: "Discuss this month’s novel.",
      ar: "ناقش رواية هذا الشهر.",
      ja: "今月の小説について話し合います。",
      fr: "Discutez du roman du mois.",
    },
  },
  {
    id: 3,
    date: "18-05",
    title: {
      en: "Startup Networking",
      ar: "لقاء رواد الأعمال",
      ja: "スタートアップ交流会",
      fr: "Réseautage startup",
    },
    content: {
      en: "Meet founders, developers, and investors.",
      ar: "تعرّف على المؤسسين والمطورين والمستثمرين.",
      ja: "創設者、開発者、投資家と会いましょう。",
      fr: "Rencontrez les fondateurs, les développeurs.",
    },
  },
  {
    id: 4,
    date: "20-06",
    title: {
      en: "Cooking Class",
      ar: "درس الطبخ",
      ja: "料理教室",
      fr: "Cours de cuisine",
    },
    content: {
      en: "Prepare a traditional meal.",
      ar: "قم بإعداد وجبة تقليدية.",
      ja: "伝統的な食事を準備します。",
      fr: "Préparez un repas traditionnel.",
    },
  },
  {
    id: 5,
    date: "22-07",
    title: {
      en: "Yoga in the Park",
      ar: "اليوغا في الحديقة",
      ja: "公園ヨガ",
      fr: "Yoga au parc",
    },
    content: {
      en: "A relaxing outdoor yoga session.",
      ar: "جلسة يوغا مريحة في الهواء الطلق.",
      ja: "リラックスできる屋外ヨガセッション。",
      fr: "Une séance de yoga en plein air.",
    },
  },
  {
    id: 6,
    date: "24-08",
    title: {
      en: "Tech Talk",
      ar: "محاضرة تقنية",
      ja: "技術トーク",
      fr: "Conférence tech",
    },
    content: {
      en: "Listen to a speaker.",
      ar: "استمع إلى المتحدث.",
      ja: "スピーカーの話を聞きます。",
      fr: "Écoutez un intervenant.",
    },
  },
  {
    id: 7,
    date: "26-10",
    title: {
      en: "Charity Run",
      ar: "سباق خيري",
      ja: "チャリティーラン",
      fr: "Course caritative",
    },
    content: {
      en: "Participate in a friendly run.",
      ar: "شارك في جولة جري ودية.",
      ja: "フレンドリーランに参加しましょう。",
      fr: "Participez à une course conviviale.",
    },
  },
  {
    id: 8,
    date: "28-11",
    title: {
      en: "Photography Walk",
      ar: "جولة تصوير فوتوغرافي",
      ja: "フォトウォーク",
      fr: "Balade photographique",
    },
    content: {
      en: "Explore the city.",
      ar: "استكشف المدينة.",
      ja: "街を探索しましょう",
      fr: "Explorez la ville.",
    },
  },
  {
    id: 9,
    date: "30-12",
    title: {
      en: "Language Exchange",
      ar: "تبادل لغوي",
      ja: "言語交流会",
      fr: "Échange linguistique",
    },
    content: {
      en: "Practice speaking different languages.",
      ar: "مارس التحدث بلغات مختلفة.",
      ja: "さまざまな言語を話す練習をします。",
      fr: "Pratiquez différentes langues.",
    },
  },
];

export const generateVacancies = (page, filter) => {
  return Array.from({ length: page < 7 ? 11 : 5 }).map((_, i) => {
    const titles = [
      {
        en: "Frontend Developer",
        fr: "Développeur Frontend",
        ar: "مطور واجهات أمامية",
        ja: "フロントエンド開発者",
      },
      {
        en: "Backend Developer",
        fr: "Développeur Backend",
        ar: "مطور خلفية",
        ja: "バックエンド開発者",
      },
      {
        en: "Full Stack Engineer",
        fr: "Ingénieur Full Stack",
        ar: "مهندس فل ستاك",
        ja: "フルスタックエンジニア",
      },
      {
        en: "DevOps Engineer",
        fr: "Ingénieur DevOps",
        ar: "مهندس ديف أوبس",
        ja: "DevOpsエンジニア",
      },
      {
        en: "Cloud Engineer",
        fr: "Ingénieur Cloud",
        ar: "مهندس سحابة",
        ja: "クラウドエンジニア",
      },
      {
        en: "Data Engineer",
        fr: "Ingénieur Data",
        ar: "مهندس بيانات",
        ja: "データエンジニア",
      },
      {
        en: "QA Engineer",
        fr: "Ingénieur QA",
        ar: "مهندس ضمان الجودة",
        ja: "QAエンジニア",
      },
      {
        en: "Mobile Developer",
        fr: "Développeur Mobile",
        ar: "مطور تطبيقات موبايل",
        ja: "モバイル開発者",
      },
      {
        en: "Machine Learning Engineer",
        fr: "Ingénieur Machine Learning",
        ar: "مهندس تعلم الآلة",
        ja: "機械学習エンジニア",
      },
      {
        en: "Site Reliability Engineer",
        fr: "Ingénieur Fiabilité Site",
        ar: "مهندس موثوقية الموقع",
        ja: "サイト信頼性エンジニア",
      },
    ];
    const title = titles[Math.floor(Math.random() * titles.length)];
    return {
      id: Math.floor(Math.random() * 10000) + 1,
      title,
      location: ["CA", "NY", "TX", "WA", "FL", "IL", "MA", "R"][
        Math.floor(Math.random() * 8)
      ],
      applicants: Math.floor(Math.random() * 200) + 1,
      newApps: Math.floor(Math.random() * 6),
      status:
        filter !== "all"
          ? filter
          : ["open", "completed", "inprogress"][Math.floor(Math.random() * 3)],
      publication: `2026-0${Math.floor(Math.random() * 8) + 1}-${String((Math.floor(Math.random() * 400) % 28) + 1).padStart(2, "0")}T10:00:00Z`,
      trend: generateSharpRandomSeries(),
    };
  });
};

/*This helper function is generated with AI, its whole purpose is to generate fake data and numbers that are statiscally pleasant represening in a graph*/
export function generateRandomVacancy(id) {
  // ---- ID + seed from string ----
  const finalId = id ?? `vac_${Math.random().toString(36).slice(2, 10)}`;

  function hashString(str) {
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
  }

  function mulberry32(a) {
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const seed = hashString(finalId)();
  const rand = mulberry32(seed);

  const randInt = (min, max) => Math.floor(rand() * (max - min + 1)) + min;

  const randItem = (arr) => arr[Math.floor(rand() * arr.length)];

  const randomDate = (start, end) =>
    new Date(start.getTime() + rand() * (end.getTime() - start.getTime()));

  const formatDate = (date) => date.toISOString();

  // ---- Trend (smooth UI-friendly) ----
  const generateTrend = (length) => {
    const base = randInt(80, 200);
    const amplitude = randInt(10, 40);
    const frequency = rand() * 0.5 + 0.2;

    return Array.from({ length }, (_, i) => {
      const wave = Math.sin(i * frequency) * amplitude;
      const noise = randInt(-5, 5);
      return Math.max(0, Math.round(base + wave + noise));
    });
  };

  // ---- Multilang helpers ----
  const langs = ["en", "fr", "ar", "ja"];

  const mapLang = (fn) => Object.fromEntries(langs.map((l) => [l, fn(l)]));

  // ---- Data pools ----
  const titles = {
    en: ["Frontend Developer", "Backend Engineer", "Fullstack Developer"],
    fr: ["Développeur Frontend", "Ingénieur Backend", "Développeur Fullstack"],
    ar: ["مطور واجهات", "مهندس خلفيات", "مطور شامل"],
    ja: [
      "フロントエンドエンジニア",
      "バックエンドエンジニア",
      "フルスタックエンジニア",
    ],
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

  // ---- Dates ----
  const open = randomDate(new Date(2023, 0, 1), new Date());
  const close = randomDate(
    open,
    new Date(open.getTime() + 1000 * 60 * 60 * 24 * 90),
  );

  // ---- Funnel (coherent numbers) ----
  const views = randInt(250, 1000);
  const applicants = Math.floor(views * (0.05 + rand() * 0.15));
  const shortlisted = Math.floor(applicants * (0.2 + rand() * 0.3));
  const progress = Math.floor(shortlisted * (0.4 + rand() * 0.4));

  // ---- Overview cards ----
  const overviews = [
    {
      type: "views",
      total: views,
      new: randInt(0, views * 0.5) * [1, -1][Math.floor(Math.random() * 2)],
    },
    {
      type: "apps",
      total: applicants,
      new: randInt(0, applicants) * [1, -1][Math.floor(Math.random() * 2)],
    },
    {
      type: "shortlist",
      total: shortlisted,
      new: randInt(0, shortlisted) * [1, -1][Math.floor(Math.random() * 2)],
    },
    {
      type: "progress",
      total: progress,
      new: randInt(0, progress) * [1, -1][Math.floor(Math.random() * 2)],
    },
  ];

  // ---- Distribution (levels) ----
  const junior = randInt(10, 40);
  const mid = randInt(20, 50);
  const senior = randInt(10, 30);
  const distTotal = junior + mid + senior;

  return {
    id: finalId,

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
      title: mapLang((l) => randItem(titles[l])),

      status: randItem(["open", "completed", "inprogress"]),

      openDate: formatDate(open),
      closeDate: formatDate(close),

      salary: rand() > 0.3 ? randInt(30000, 120000) : null,

      skills: mapLang((l) =>
        Array.from(
          new Set(
            Array.from({ length: randInt(3, 5) }, () =>
              randItem(skillsPool[l]),
            ),
          ),
        ),
      ),

      description: mapLang((l) =>
        Array.from({ length: randInt(2, 4) }, () => randItem(descriptions[l])),
      ),

      notes: mapLang((l) =>
        Array.from({ length: randInt(1, 3) }, () => randItem(notesList[l])),
      ),
    },
  };
}
/**/

/* This helper function is generated with AI, its whole purpose is to generate fake data and numbers that are statiscally pleasant represening in a graph */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateTrend() {
  const trend = Array.from({ length: 7 }, () => getRandomInt(0, 5));

  // ensure at least one 0
  if (!trend.includes(0)) {
    const index = getRandomInt(0, 6);
    trend[index] = 0;
  }

  return trend;
}

export function generateApplicantsOverview() {
  return {
    open: {
      total: getRandomInt(0, 200),
      trend: generateTrend(),
      new: getRandomInt(0, 9),
    },
    active: {
      total: getRandomInt(0, 1000),
      trend: generateTrend(),
      new: getRandomInt(0, 9),
    },
    hiring: {
      average: getRandomInt(0, 300),
      trend: generateTrend(),
      stages: getRandomInt(1, 6),
    },
    candidate: {
      average: getRandomInt(0, 75),
      trend: generateTrend(),
      percentage: getRandomInt(0, 99),
    },
  };
}
/**/

const positions = [
  "front",
  "backend",
  "design",
  "fullStack",
  "data",
  "c++",
  "php",
  "django",
  "project",
  "devOps",
  "cloud",
];

const statuses = ["new", "1", "2", "3", "review", "onboard", "offer"];

const names = [
  "Yassine",
  "Karim",
  "Salma",
  "Nadia",
  "Omar",
  "Hassan",
  "Amine",
  "Leila",
  "Rachid",
  "Imane",
];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomEmail(name) {
  const domains = ["gmail.com", "yahoo.com", "outlook.com"];
  return `${name.toLowerCase()}${Math.floor(Math.random() * 1000)}@${randomItem(domains)}`;
}

function randomDate() {
  return new Date(
    Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30),
  ).toISOString();
}

export function generateApplicant(id) {
  const name = randomItem(names);

  const data = {
    id,
    name,
    position: randomItem(positions),
    date: randomDate(),
    status: Math.floor(Math.random() * 6) + 1,
    email: randomEmail(name),
    rating: Math.floor(Math.random() * 5),
  };

  // optional validation
  return data;
}

// ---- generate multiple ----

export function generateApplicants(count) {
  return Array.from({ length: count }, (_, i) => generateApplicant(i));
}

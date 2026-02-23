import auth from "../helpers/auth.js";
import {
  arNotifications,
  enNotifications,
  frNotifications,
  jaNotifications,
} from "../helpers/sample.js";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed ..." });
  try {
    const { unread, ...rest } = req.query;
    if (unread === "true") {
      return res
        .status(200)
        .json({ unreadCount: enNotifications.filter((n) => n.read).length });
    }
    auth(req, res);
    return res.status(200).json({
      notifications: {
        en: enNotifications,
        ja: jaNotifications,
        ar: arNotifications,
        fr: frNotifications,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error ..." });
  }
}

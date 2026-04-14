import auth from "../helpers/auth.js";
import { NOTIFICATIONS } from "../helpers/data/notifications.js";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed ..." });
  try {
    await auth(req, res);
    if (res.headersSent || res.writableEnded) {
      return;
    }

    return res.status(200).json({
      data: NOTIFICATIONS,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error ..." });
  }
}

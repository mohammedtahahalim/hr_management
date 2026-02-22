import auth from "../helpers/auth.js";
import { notifications } from "../helpers/sample.js";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed ..." });
  try {
    const { unread, ...rest } = req.query;
    if (unread === "true") {
      return res.status(200).json({ unreadCount: 0 });
    }
    auth(req, res);
    return res.status(200).json({ notifications });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error ..." });
  }
}

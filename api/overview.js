import auth from "../helpers/auth.js";
import { generateOverview } from "../helpers/helpers.js";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "NotAllowed" });
  try {
    await auth(req, res);
    if (res.headersSent || res.writeableEnded) return;
    const { date } = req.query;
    return res.status(200).json({ data: generateOverview() });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}

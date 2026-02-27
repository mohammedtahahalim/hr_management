import auth from "../helpers/auth.js";
import { allowedQueries } from "../helpers/constants.js";
import { candidates } from "../helpers/sample.js";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed ..." });
  try {
    await auth(req, res);
    if (res.headersSent || res.writableEnded) {
      return;
    }
    const { block, ...rest } = req.query;
    if (!allowedQueries["dashboard"].includes(block))
      return res.status(400).json({ message: "Bad format ..." });
    switch (block) {
      case "candidate":
        await new Promise((res) => setTimeout(() => res(), 2000));
        return res.status(200).json({ candidates });
        break;
      case "departments":
        break;
      case "distribution":
        break;
      case "recent":
        break;
      case "collection":
        break;
      case "activity":
        break;
      default:
        return res.status(400).json({ message: "Bad format ..." });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}

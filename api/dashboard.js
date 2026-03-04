import auth from "../helpers/auth.js";
import {
  allowedQueries,
  generateCandidates,
  generateDepartments,
} from "../helpers/constants.js";

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
        return res.status(200).json({ candidates: generateCandidates() });
        break;
      case "departments":
        return res.status(200).json({ data: generateDepartments() });
        break;
      case "distribution":
        return res.status(401).json({ message: "unautentitacted" });
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

import auth from "../helpers/auth.js";
import {
  allowedQueries,
  generateCandidates,
  generateDepartments,
  generateDistributions,
} from "../helpers/constants.js";
import { collections, recentJobs } from "../helpers/sample.js";

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
      case "departments":
        return res.status(200).json({ data: generateDepartments() });
      case "distribution":
        const { week } = rest;
        return res.status(200).json({ data: generateDistributions() });
      case "recent":
        return res.status(200).json({ data: recentJobs });
      case "collection":
        return res.status(200).json({ data: collections });
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

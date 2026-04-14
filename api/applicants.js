import auth from "../helpers/auth.js";
import { ALLOWED_QUERIES } from "../helpers/constants.js";
import {
  generateApplicants,
  generateSingleApplicant,
  generateApplicantsOverview,
} from "../helpers/helpers.js";

const DEFAULT_PAGE = 1;
const DEFAULT_LAST_PAGE = 7;

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed ..." });
  try {
    await auth(req, res);
    if (res.headersSent || res.writableEnded) {
      return;
    }

    const { block, id } = req.query;
    if (id) {
      /* ----------------------------- Single applicant request ----------------------------- */
      if (isNaN(Number(id)))
        return res.status(400).json({ message: "Bad Format ..." });
      return res.status(200).json({ data: generateSingleApplicant(id) });
    }

    if (block) {
      /* ----------------------------- Response by block ----------------------------- */
      if (!ALLOWED_QUERIES["applicants"].includes(block))
        return res.status(400).json({ message: "Bad Format ..." });
      return res.status(200).json({ data: generateApplicantsOverview() });
    }

    /* ----------------------------- Default: all applicant ----------------------------- */
    let { page = DEFAULT_PAGE, pageSize = 10 } = req.query ?? {};
    pageSize = Math.min(pageSize, 10);
    return res.status(200).json({
      data: generateApplicants(pageSize),
      page: Math.min(page, DEFAULT_LAST_PAGE),
      pageSize,
      lastPage: DEFAULT_LAST_PAGE,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}

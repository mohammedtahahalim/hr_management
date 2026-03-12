import auth from "../helpers/auth.js";
import { allowedFilters } from "../helpers/constants.js";
import { generateVacancies } from "../helpers/sample.js";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed ..." });
  try {
    // await auth(req, res);
    if (res.headersSent || res.writableEnded) {
      return;
    }
    let { page = 1, filter = "all", ...rest } = req.query;
    page = Number(page);
    page = isNaN(page) ? 1 : page;
    if (!allowedFilters.includes(filter))
      return res.status(400).json({ message: "Bad request ..." });
    const data = generateVacancies(page, filter);
    return res.status(200).json({
      data,
      lastPage: 7,
      currentPage: page,
      pageSize: 12,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error ..." });
  }
}

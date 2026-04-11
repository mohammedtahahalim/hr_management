import auth from "../helpers/auth.js";
import { ALLOWED_QUERIES } from "../helpers/constants.js";
import {
  generateRandomVacancy,
  generateVacancies,
} from "../helpers/helpers.js";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed ..." });
  try {
    await auth(req, res);
    if (res.headersSent || res.writableEnded) {
      return;
    }
    let {
      page = 1,
      filter = "all",
      dept = "all",
      posType = "all",
      exp = "all",
      loc = "all",
      id,
      ...rest
    } = req.query;
    if (id) {
      return res.status(200).json({
        data: generateRandomVacancy(id),
      });
    }
    page = Number(page);
    page = isNaN(page) ? 1 : page;
    if (
      !ALLOWED_QUERIES["vacancies"]["filter"].includes(filter) ||
      !ALLOWED_QUERIES["vacancies"]["dept"].includes(dept) ||
      !ALLOWED_QUERIES["vacancies"]["posType"].includes(posType) ||
      !ALLOWED_QUERIES["vacancies"]["exp"].includes(exp) ||
      !ALLOWED_QUERIES["vacancies"]["loc"].includes(loc)
    )
      return res.status(400).json({ message: "Bad request ..." });
    const data = generateVacancies(page, filter, dept, posType, exp, loc, id);
    return res.status(200).json({
      data,
      lastPage: 7,
      currentPage: page,
      pageSize: 11,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error ..." });
  }
}

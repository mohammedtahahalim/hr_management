import auth from "../helpers/auth.js";
import { generatePayrolls } from "../helpers/helpers.js";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 8;

const allowedPageSize = ["8", "12", "16", "20"];

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed ..." });
  try {
    await auth(req, res);
    if (res.sentHeaders || res.writableEnded) return;

    let {
      page = DEFAULT_PAGE,
      pageSize = DEFAULT_PAGE_SIZE,
      ...rest
    } = req.query;
    page = Math.min(page, Math.floor(91 / pageSize));

    if (!allowedPageSize.includes(pageSize)) pageSize = 8;
    return res.status(200).json({
      page,
      pageSize,
      lastPage: Math.floor(91 / pageSize),
      data: generatePayrolls(pageSize),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}

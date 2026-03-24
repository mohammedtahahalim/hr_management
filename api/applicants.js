import auth from "../helpers/auth.js";
import {
  generateApplicants,
  generateApplicantsOverview,
} from "../helpers/sample.js";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed ..." });
  try {
    await auth(req, res);
    if (res.headersSent || res.writableEnded) {
      return;
    }
    const { block } = req.query;
    if (block === "overview") {
      return res.status(200).json({ data: generateApplicantsOverview() });
    }
    let { page = 1, pageSize = 10 } = req.query ?? {};
    pageSize = Math.min(pageSize, 10);
    let lastPage = 7;
    return res.status(200).json({
      data: generateApplicants(pageSize),
      page: Math.min(page, lastPage),
      pageSize,
      lastPage,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}

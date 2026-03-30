import auth from "../helpers/auth.js";
import { generateEmployee } from "../helpers/sample.js";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Internal Server Error ..." });
  try {
    await auth(req, res);
    if (res.headersSent || res.writableEnded) return;
    const { page = 1, pageSize = 10, ...rest } = req.query;
    return res.status(200).json({
      page: Number(page),
      pageSize: Number(pageSize),
      lastPage: 7,
      data: Array.from({ length: Number(pageSize) }, () => generateEmployee()),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

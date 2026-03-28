import auth from "../helpers/auth.js";
import { generateEmployee } from "../helpers/sample.js";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Internal Server Error ..." });
  try {
    await auth(req, res);
    if (res.headersSent || res.writableEnded) return;
    const { page = "1" } = req.query;
    return res.status(200).json({
      page: Number(page),
      pageSize: 8,
      lastPage: 8,
      data: Array.from({ length: 8 }, () => generateEmployee()),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

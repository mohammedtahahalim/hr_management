import auth from "../helpers/auth.js";
import { generateEmployee, generateFullEmployee } from "../helpers/sample.js";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Internal Server Error ..." });
  try {
    // await auth(req, res);
    if (res.headersSent || res.writableEnded) return;
    const { page = 1, pageSize = 10, id, ...rest } = req.query;
    if (id) {
      if (typeof id !== "string" || isNaN(Number(id)))
        return res.status(400).json({ message: "Bad Request" });
      return res.status(200).json({
        data: generateFullEmployee(id),
      });
    }
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

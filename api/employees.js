import auth from "../helpers/auth.js";
import {
  generateSingleEmployee,
  generateEmployees,
} from "../helpers/helpers.js";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Internal Server Error ..." });
  try {
    await auth(req, res);
    if (res.headersSent || res.writableEnded) return;
    const { page = 1, pageSize = 8, id, mode, ...rest } = req.query;
    if (id) {
      if (typeof id !== "string" || isNaN(Number(id)))
        return res.status(400).json({ message: "Bad Request" });
      return res.status(200).json({
        data: generateSingleEmployee(id),
      });
    }
    if (mode) {
      return res.status(403).json({ message: "Forbidden" });
    }
    return res.status(200).json({
      page: Number(page),
      pageSize: Number(pageSize),
      lastPage: 7,
      data: generateEmployees(pageSize),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

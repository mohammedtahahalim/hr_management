import { parse } from "cookie";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), "config", ".env") });

const { SECRET_KEY } = process.env;

if (!SECRET_KEY) throw new Error("missingKey");

export default function auth(req, res) {
  try {
    const cookies = parse(req.headers.cookie || "");
    const { token } = cookies;
    if (!token) return res.status(401).json({ message: "UNAUTHENTICATED" });
    jwt.verify(token, SECRET_KEY);
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "UNAUTHENTICATED" });
  }
}

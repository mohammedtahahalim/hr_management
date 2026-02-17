import bcrypt from "bcrypt";
import database from "../helpers/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { serialize } from "cookie";

dotenv.config({ path: path.resolve(process.cwd(), "config", ".env") });

const { SECRET_KEY } = process.env;

if (!SECRET_KEY) throw new Error("missingKey");

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed ..." });
  try {
    const { email, password, rememberMe } = JSON.parse(req.body);
    const connection = database();
    const [doesEmailExists] = await connection.query(
      "select id, hashed_pass, active from accounts where email = ?",
      [email],
    );
    if (!doesEmailExists.length)
      return res.status(401).json({ message: "invalidCredentials" });

    const { id, hashed_pass, active } = doesEmailExists[0];
    const isValidPass = await bcrypt.compare(password, hashed_pass);
    if (!isValidPass)
      return res.status(401).json({ message: "invalidCredentials" });
    if (!active) return res.status(403).json({ message: "forbidden" });
    const detailsQuery = `select firstName, lastName, role from infos where userId = ?`;
    const [userInfo] = await connection.query(detailsQuery, [id]);
    const { firstName, lastName, role } = userInfo[0];
    const token = jwt.sign(
      { id, firstName, lastName, email, role },
      process.env.SECRET_KEY,
    );
    res.setHeader(
      "Set-Cookie",
      serialize("token", token, {
        maxAge: (rememberMe ? 24 : 3) * 60 * 60,
        sameSite: "strict",
        httpOnly: true,
        path: "/",
        secure: true,
      }),
    );
    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}

import { serialize } from "cookie";
import bcrypt from "bcrypt";
import database from "../helpers/database.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

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
      return res
        .status(200)
        .json({ isAuthenticated: false, isBanned: false, whoIs: null });

    const { id, hashed_pass, active } = doesEmailExists[0];
    const isValidPass = await bcrypt.compare(password, hashed_pass);
    if (!isValidPass)
      return res
        .status(200)
        .json({ isAuthenticated: false, isBanned: false, whoIs: null });
    if (!active)
      return res
        .status(200)
        .json({ isAuthenticated: true, isBanned: true, whoIs: null });

    const detailsQuery = `select firstName, lastName, role, profilePic from infos where userId = ?`;
    const [userInfo] = await connection.query(detailsQuery, [id]);
    const { firstName, lastName, role, profilePic } = userInfo[0];
    const token = jwt.sign(
      { id, firstName, lastName, email, role, profilePic },
      process.env.SECRET_KEY,
    );
    res.setHeader(
      "Set-Cookie",
      serialize("token", token, {
        maxAge: (rememberMe ? 24 * 7 : 3) * 60 * 60,
        sameSite: "strict",
        httpOnly: true,
        path: "/",
        secure: true,
      }),
    );
    return res.status(200).json({
      isAuthenticated: true,
      isBanned: false,
      whoIs: { id, firstName, lastName, email, role, profilePic },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}

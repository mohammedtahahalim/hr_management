import { parse, serialize } from "cookie";
import { ALLOWED_QUERIES } from "../helpers/constants.js";
import database from "../helpers/database.js";
import dotenv from "dotenv";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config({ path: path.resolve(process.cwd(), "config", ".env") });

const { SECRET_KEY } = process.env;

if (!SECRET_KEY) throw new Error("Missing Secret Key ...");

export default async function handler(req, res) {
  try {
    // Filter Queries
    const { type, ...rest } = req.query;
    if (!ALLOWED_QUERIES["auth"].includes(type))
      return res.status(400).json({ message: "BadRequest" });

    switch (type) {
      /* ----------------------------- Auth Check ----------------------------- */
      case "check": {
        if (req.method !== "GET")
          return res.status(405).json({ message: "NotAllowed" });

        const cookies = parse(req.headers.cookie || "");
        const token = cookies.token;
        if (!token) {
          return res.status(401).json({ message: "UnAuthenticated" });
        }

        try {
          const isValidToken = jwt.verify(token, SECRET_KEY);
          const { id, firstName, lastName, email, role, profilePic } =
            isValidToken;
          return res.status(200).json({
            user: { id, firstName, lastName, email, role, profilePic },
          });
        } catch (err) {
          res.setHeader(
            "Set-Cookie",
            serialize("token", "", {
              maxAge: 0,
              sameSite: "strict",
              httpOnly: true,
              path: "/",
              secure: true,
            }),
          );
          return res.status(401).json({ message: "UnAuthenticated" });
        }
      }

      case "login": {
        /* ----------------------------- Login Request ----------------------------- */
        if (req.method !== "POST")
          return res.status(405).json({ message: "NotAllowed" });

        const { email, password, rememberMe } = req.body;
        const duration = rememberMe ? 7 : 3;
        const connection = database();
        const [doesEmailExists] = await connection.query(
          "select id, hashed_pass, active from accounts where email = ?",
          [email],
        );
        if (!doesEmailExists.length)
          return res.status(401).json({ message: "UnAuthenticated" });

        const { id, hashed_pass, active } = doesEmailExists[0];
        if (!active) return res.status(403).json({ message: "Forbidden" });

        const isValidPass = await bcrypt.compare(password, hashed_pass);
        if (!isValidPass)
          return res.status(401).json({ message: "UnAuthenticated" });

        const detailsQuery = `select firstName, lastName, role, profilePic from infos where userId = ?`;
        const [userInfo] = await connection.query(detailsQuery, [id]);
        const { firstName, lastName, role, profilePic } = userInfo[0];
        const token = jwt.sign(
          { id, firstName, lastName, email, role, profilePic },
          process.env.SECRET_KEY,
          { expiresIn: `${duration}d` },
        );
        res.setHeader(
          "Set-Cookie",
          serialize("token", token, {
            maxAge: 24 * duration * 60 * 60,
            sameSite: "strict",
            httpOnly: true,
            path: "/",
            secure: true,
          }),
        );
        return res.status(200).json({
          user: { id, firstName, lastName, email, role, profilePic },
        });
      }

      case "logout": {
        /* ----------------------------- Logout Request ----------------------------- */
        if (req.method !== "GET")
          return res.status(405).json({ message: "NotAllowed" });

        try {
          res.setHeader(
            "Set-Cookie",
            serialize("token", "", {
              maxAge: 0,
              sameSite: "strict",
              httpOnly: true,
              path: "/",
              secure: true,
            }),
          );
          return res.status(200).json({ message: "Logged out ..." });
        } catch (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal server error ..." });
        }
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}

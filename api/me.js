import { parse, serialize } from "cookie";
import database from "../helpers/database.js";
import dotenv from "dotenv";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ALLOWED_QUERIES } from "../helpers/constants.js";

dotenv.config({ path: path.resolve(process.cwd(), "config", ".env") });

const { SECRET_KEY } = process.env;

export default async function handler(req, res) {
  if (!SECRET_KEY) throw new Error("Missing Secret Key ...");
  try {
    // Filter Queries
    const { type, ...rest } = req.query;
    if (!ALLOWED_QUERIES["auth"].includes(type))
      return res.status(400).json({ message: "Bad Request ..." });

    switch (type) {
      /*--------------------  Auth Check  /*--------------------*/
      case "check": {
        if (req.method !== "GET")
          return res.status(405).json({ message: "Method Not Allowed ..." });

        const cookies = parse(req.headers.cookie || "");
        const token = cookies.token;
        if (!token) {
          return res.status(401).json({ message: "User Not Authenticated" });
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
          return res.status(401).json({ message: "User Not Authenticated" });
        }
      }

      case "login": {
        /*--------------------  Login Request  /*--------------------*/
        if (req.method !== "POST")
          return res.status(405).json({ message: "Method Not Allowed ..." });

        const { email, password, rememberMe } = req.body;
        const connection = database();
        const [doesEmailExists] = await connection.query(
          "select id, hashed_pass, active from accounts where email = ?",
          [email],
        );
        if (!doesEmailExists.length)
          return res.status(401).json({ message: "User Not Authenticated" });

        const { id, hashed_pass, active } = doesEmailExists[0];
        if (!active) return res.status(403).json({ message: "Forbidden" });

        const isValidPass = await bcrypt.compare(password, hashed_pass);
        if (!isValidPass)
          return res.status(401).json({ message: "User Not Authenticated" });

        const detailsQuery = `select firstName, lastName, role, profilePic from infos where userId = ?`;
        const [userInfo] = await connection.query(detailsQuery, [id]);
        const { firstName, lastName, role, profilePic } = userInfo[0];
        const token = jwt.sign(
          { id, firstName, lastName, email, role, profilePic },
          process.env.SECRET_KEY,
          { expiresIn: "7d" },
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
          user: { id, firstName, lastName, email, role, profilePic },
        });
      }

      case "logout": {
        /*--------------------  Logout Request  /*--------------------*/
        if (req.method !== "GET")
          return res.status(405).json({ message: "Method not allowed ..." });

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

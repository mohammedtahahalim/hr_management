import { parse, serialize } from "cookie";
import dotenv from "dotenv";
import path from "path";
import jwt from "jsonwebtoken";

dotenv.config({ path: path.resolve(process.cwd(), "config", ".env") });

const { SECRET_KEY } = process.env;

export default async function handler(req, res) {
  if (!SECRET_KEY) throw new Error("Missing Secret Key ...");
  try {
    if (req.method !== "GET")
      return res.status(405).json({ message: "Method Not Allowed ..." });

    const cookies = parse(req.headers.cookie || "");
    const token = cookies.token;
    if (!token) {
      return res.status(200).json({
        isAuthenticated: false,
        isAllowed: false,
        whoIs: null,
      });
    }

    try {
      const isValidToken = jwt.verify(token, SECRET_KEY);
      const { id, firstName, lastName, email, role } = isValidToken;

      return res.status(200).json({
        isAuthenticated: true,
        isAllowed: true,
        whoIs: { id, firstName, lastName, email, role },
      });
    } catch (err) {
      res.setHeader(
        "Set-Cookie",
        serialize("token", "", {
          maxAge: 6 * 60 * 60,
          sameSite: "strict",
          httpOnly: true,
          path: "/",
          secure: true,
        }),
      );
      return res
        .status(200)
        .json({ isAuthenticated: false, isAllowed: false, whoIs: null });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}

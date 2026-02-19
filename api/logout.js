import { parse, serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST")
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

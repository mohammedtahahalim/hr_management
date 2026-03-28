import auth from "../helpers/auth.js";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Internal Server Error ..." });
  try {
    await auth(req, res);
    if (res.headersSent || res.writableEnded) return;
    const { page = "1" } = req.query;
    return res.status(200).json({ message: "Test" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

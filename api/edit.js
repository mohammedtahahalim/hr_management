export default async function handler(req, res) {
  try {
    return res.status(403).json({ message: "Forbidden" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}

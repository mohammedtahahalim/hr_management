export default async function handler(req, res) {
  // placeholder for edit page (not setup, as there is no dedicated db to allow for editing entries)
  try {
    return res.status(403).json({ message: "Forbidden" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}

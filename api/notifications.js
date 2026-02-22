export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed ..." });
  try {
    const { unread, ...rest } = req.query;
    if (unread === "true") {
      return res.status(200).json({ unreadCount: 7 });
    }
    return res.status(401).json({ message: "Forbidden" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error ..." });
  }
}

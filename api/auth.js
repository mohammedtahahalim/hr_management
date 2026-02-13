export default async function handler(req, res) {
  try {
    if (req.method !== "GET")
      return res.status(405).json({ message: "Method Not Allowed ..." });
    return res.status(200).json({
      whoIs: {
        id: 1,
        firstName: "Taha",
        lastName: "Halim",
        role: "admin",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error ..." });
  }
}

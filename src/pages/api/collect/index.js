import { useCors } from "lib/middleware";

export default async (req, res) => {
  await useCors(req, res);

  if (req.method !== "POST") {
    return res.status(400).json({ message: "Invalid request method" });
  }

  const data = req.body;
  console.log("Received tracking data:", data);

  return res.status(200).json({ message: "Tracking data received" });
};

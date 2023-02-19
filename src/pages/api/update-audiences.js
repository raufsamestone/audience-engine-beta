import audiences from "../../../data/audiences.json";

export default function handler(req, res) {
  const { method, body } = req;

  if (method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { combinedAudiences } = body;

  // Find the combined audiences and update their data in the audiences array
  combinedAudiences.forEach(audience => {
    const index = audiences.findIndex(a => a.id === audience.id);
    if (index !== -1) {
      audiences[index] = audience;
    }
  });

  fs.writeFileSync("./data/audiences.json", JSON.stringify(audiences));

  res.status(200).json({ message: "Audience data updated successfully" });
}

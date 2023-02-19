import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default (req, res) => {
  if (req.method === "POST") {
    const { name, description, visitors, sessionTime, bounceRate, rfmScore } =
      req.body;

    // Read existing data from JSON file
    const data = JSON.parse(fs.readFileSync("./data/audiences.json"));
    const uniqueId = uuidv4();

    // Add new audience to data object
    const newAudience = {
      id: uniqueId,
      createdAt: new Date(),
      description,
      name,
      visitors,
      sessionTime,
      bounceRate,
      rfmScore,
    };
    data.push(newAudience);

    console.log(newAudience);

    // Write updated data to JSON file
    fs.writeFileSync("./data/audiences.json", JSON.stringify(data));

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

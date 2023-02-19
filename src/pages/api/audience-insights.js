import { insights } from "../utils/audience";

export default async function handler(req, res) {
  const { audienceId } = req.body;

  try {
    // Retrieve audience data from the database based on the provided ID
    const audienceData = await db.getAudienceById(audienceId);

    // Generate insights for the audience using the audience data
    const audienceInsights = insights.generate(audienceData);

    res.status(200).json(audienceInsights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate audience insights." });
  }
}

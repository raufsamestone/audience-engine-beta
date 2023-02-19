import audienceData from "../../../data/audiences.json";

export default function handler(req, res) {
  const { ids } = req.query;
  const audienceIds = ids;

  const audiences = audienceData.filter(audience =>
    audienceIds.includes(String(audience.id))
  );

  res.status(200).json(audiences);
}

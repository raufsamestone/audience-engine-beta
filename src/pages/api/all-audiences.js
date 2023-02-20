import audienceData from "../../../data/audiences.json";

export default function handler(req, res) {
  res.status(200).json(audienceData);
}

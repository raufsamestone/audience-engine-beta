import audiences from "../../../data/audiences.json";

export default function handler(req, res) {
  const { id } = req.query;
  const audience = audiences.find(audience => audience.id == id);

  if (!audience) {
    res.status(404).json({ message: `Audience with ID ${id} not found` });
  } else {
    res.status(200).json(audience);
  }
}

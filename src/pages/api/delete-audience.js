import audiences from "../../../data/audiences.json";
import fs from "fs";

export default function handler(req, res) {
  const { id } = req.query;

  // find index of the audience to delete in the JSON file
  const index = audiences.findIndex((audience) => audience.id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ message: `Audience with id ${id} not found` });
  }

  // remove the audience from the JSON file
  audiences.splice(index, 1)[0];

  // // Write updated data to JSON file
  fs.writeFileSync("./data/audiences.json", JSON.stringify(audiences));
  // return updated audiences list
  return res.status(200).json({ audiences });
}

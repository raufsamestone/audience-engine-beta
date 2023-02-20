import audiences from "../../../data/audiences.json";
import fs from "fs";

export default function handler(req, res) {
  const { ids } = req.query;
  // convert ids string to array of numbers
  const idsArray = ids.split(",").map((id) => id);

  // find index of each audience to delete in the JSON file
  const indexes = idsArray.map((id) =>
    audiences.findIndex((audience) => audience.id === id)
  );

  // remove the audiences from the JSON file
  const deletedAudiences = [];
  for (let i = indexes.length - 1; i >= 0; i--) {
    const index = indexes[i];
    if (index !== -1) {
      deletedAudiences.unshift(audiences.splice(index, 1)[0]);
    }
  }

  if (deletedAudiences.length === 0) {
    return res
      .status(404)
      .json({ message: `Audiences with ids ${ids} not found` });
  }

  // // Write updated data to JSON file
  fs.writeFileSync("./data/audiences.json", JSON.stringify(audiences));
  // return updated audiences list
  return res.status(200).json({ deletedAudiences });
}

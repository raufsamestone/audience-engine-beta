import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default async function handler(req, res) {
  const { ids } = req.query;
  // convert ids string to array of numbers
  const idsArray = ids.split(",");

  // delete audiences from the Supabase table
  const { data, error } = await supabase
    .from("audiences")
    .delete()
    .in("id", idsArray);

  if (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }

  // if (!data) {
  //   return res
  //     .status(404)
  //     .json({ message: `Audiences with ids ${ids} not found` });
  // }

  return res.status(200).json({ message: "Audiences deleted successfully" });
}

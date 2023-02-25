// import audienceData from "../../../data/audiences.json";

// export default function handler(req, res) {
//   res.status(200).json(audienceData);
// }

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("audiences")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.status(200).json(data);
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}

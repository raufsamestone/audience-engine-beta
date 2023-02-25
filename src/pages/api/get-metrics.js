import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;

    // Remove audience from database
    const { data, error } = await supabase
      .from("metrics")
      .select("*")
      .eq("audience_id", id);

    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }

    res.status(200).json({ data });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

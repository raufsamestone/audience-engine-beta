import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;

    const { data, error } = await supabase
      .from("audiences")
      .select("goals")
      .eq("id", id);

    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
    res.status(200).json({ goals: data[0].goals });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

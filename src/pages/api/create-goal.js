import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default async (req, res) => {
  if (req.method === "PUT") {
    const { id, goals } = req.body;
    console.log("GOAL", id, goals);
    // Update audience in database
    const { data, error } = await supabase
      .from("audiences")
      .update({ goals })
      .eq("id", id);
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

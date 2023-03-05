import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default async (req, res) => {
  if (req.method === "GET") {
    const { id, event_type } = req.query;

    // const { data, error } = await supabase
    //   .from("metrics")
    //   .select("*")
    //   .eq("audience_id", id);
    const { data, error } = await supabase
      .from("metrics")
      .select("*")
      .eq("audience_id", id)
      .eq("event_type", event_type);
    // .group("session_id");
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }

    res.status(200).json({ data });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

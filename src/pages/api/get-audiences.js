import { createClient } from "@supabase/supabase-js";
import { useCors } from "lib/middleware";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default async (req, res) => {
  await useCors(req, res);
  if (req.method === "GET") {
    const { user_id } = req.query;

    console.log(user_id);

    // Remove audience from database
    const { data, error } = await supabase
      .from("audiences")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }
    // const AudienceName = data.map((item) => item.name);
    const AudienceId = data.map((item) => item.id);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json({ AudienceId });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

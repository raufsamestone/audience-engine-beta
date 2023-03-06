import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default async (req, res) => {
  if (req.method === "DELETE") {
    const { id } = req.query;

    // Remove metrics associated with the audience from database
    const { data: metricsData, error: metricsError } = await supabase
      .from("metrics")
      .delete()
      .eq("audience_id", id);

    if (metricsError) {
      console.log(metricsError);
      return res.status(500).json({ message: "Server error" });
    }

    // Remove audience from database
    const { data: audienceData, error: audienceError } = await supabase
      .from("audiences")
      .delete()
      .eq("id", id);

    if (audienceError) {
      console.log(audienceError);
      return res.status(500).json({ message: "Server error" });
    }

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default async (req, res) => {
  if (req.method === "PUT") {
    const { name, description, id } = req.body;

    const { data: audienceData, error: audienceError } = await supabase
      .from("audiences")
      .update({ name, description })
      .match({ id });

    if (audienceError) {
      console.log(audienceError);
      return res.status(500).json({ message: "Server error" });
    }

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

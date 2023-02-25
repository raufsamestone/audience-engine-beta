import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default async (req, res) => {
  if (req.method === "POST") {
    const { name, description, user_id } = req.body;
    console.log(req.body);

    // Insert new audience to database
    // const { user } = supabase.auth.session();
    const { data, error } = await supabase.from("audiences").insert({
      created_at: new Date(),
      description,
      name,
      user_id: user_id,
    });

    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    }

    console.log(data);

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

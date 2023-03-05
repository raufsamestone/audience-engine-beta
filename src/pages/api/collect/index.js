import { useCors } from "lib/middleware";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default async (req, res) => {
  await useCors(req, res);

  if (req.method !== "POST") {
    return res.status(400).json({ message: "Invalid request method" });
  }

  const data = req.body;

  const event = {
    audience_id: data.audience_id,
    event_type: data.eventType,
    event_data: data.eventData ? data.eventData : {},
    is_conversion: data.isConversion ? data.isConversion : false,
    device_type: data.deviceType,
    browser: data.browser,
    language: data.language,
    screen: data.screen,
    utm_params: data.utmParams,
    referrer: data.referrer,
    session_id: data.session_id,
    timestamp: new Date().toISOString(),
  };

  const { error } = await supabase.from("metrics").insert([event]);

  if (error) {
    console.log("Error inserting event:", error.message);
  } else {
    console.log("Event inserted successfully:", event);
  }

  await supabase.from("metrics").insert([event]);

  console.log("Received tracking data and recorded successfully:", [event]);

  return res.status(200).json({ message: "Tracking data received" });
};

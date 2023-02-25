import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function AudienceList() {
  const [audiences, setAudiences] = useState([]);
  const supabase = useSupabaseClient();
  const session = useSession();
  const user = session?.user;

  useEffect(() => {
    async function fetchAudiences() {
      const { data, error } = await supabase
        .from("audiences")
        .select("*")
        .eq("user_id", user.id);

      if (error) console.log("Error fetching audiences:", error.message);
      else setAudiences(data);
    }

    fetchAudiences();
  }, [user]);

  return (
    <div>
      {audiences.map((audience) => (
        <div key={audience.id}>
          <h2>{audience.name}</h2>
          <p>{audience.description}</p>
        </div>
      ))}
    </div>
  );
}

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const EditAudience = () => {
  const router = useRouter();
  const { id } = router.query;
  const [audience, setAudience] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const supabase = useSupabaseClient();
  const session = useSession();

  useEffect(() => {
    if (!id) {
      return; // If the id is not provided, exit early
    }

    const fetchAudienceData = async () => {
      try {
        const res = await fetch(`/api/get-audience?id=${id}`);
        const { data, error } = await res.json();
        if (error) {
          console.log("Error fetching audience data:", error.message);
        } else {
          setAudience(data);
          setName(data[0]?.name);
        }
      } catch (error) {
        console.log("Error fetching audience data:", error.message);
      }
    };

    fetchAudienceData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/edit-audience", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        id,
      }),
    });
    const data = await res.json();
    router.push({
      pathname: `/audiences`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/2 m-auto">
      <input
        type="text"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
        className="p-2 border rounded"
        placeholder="Your audience name"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border rounded"
        placeholder="Your any audience description."
      />
      <button
        type="submit"
        className="p-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors"
      >
        Edit Audience
      </button>
    </form>
  );
};

export default EditAudience;

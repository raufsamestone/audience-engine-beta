import { useState } from "react";
import { useRouter } from "next/router";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const CreateAudience = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const supabase = useSupabaseClient();
  const session = useSession();
  const user = session.user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/create-audience", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        user_id: user.id,
      }),
    });
    const data = await res.json();
    router.push({
      pathname: `/audiences`,
    });
    console.log(data); // { success: true }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/2 m-auto">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border rounded"
        placeholder="Audience Name"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border rounded"
        placeholder="Audience Description"
      />
      <button
        type="submit"
        className="p-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors"
      >
        Create Audience
      </button>
    </form>
  );
};

export default CreateAudience;

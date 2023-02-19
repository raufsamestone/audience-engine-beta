import { useState } from "react";
import { useRouter } from "next/router";

const CreateAudience = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visitors, setVisitors] = useState(0);
  const [sessionTime, setSessionTime] = useState("");
  const [bounceRate, setBounceRate] = useState("");

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
        visitors,
        sessionTime,
        bounceRate,
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
      <input
        type="number"
        value={visitors}
        onChange={(e) => setVisitors(e.target.value)}
        className="p-2 border rounded"
        placeholder="Visitors"
      />
      <input
        type="text"
        value={sessionTime}
        onChange={(e) => setSessionTime(e.target.value)}
        className="p-2 border rounded"
        placeholder="Session Time"
      />
      <input
        type="text"
        value={bounceRate}
        onChange={(e) => setBounceRate(e.target.value)}
        className="p-2 border rounded"
        placeholder="Bounce Rate"
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

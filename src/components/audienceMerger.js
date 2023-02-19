import { useState } from "react";

const AudienceMerger = () => {
  const [name, setName] = useState("");
  const [audienceData, setAudienceData] = useState([]);
  const [audienceIds, setAudienceIds] = useState([]);

  const handleSubmitGet = async e => {

    const res = await fetch(
      `/api/get-audiences?ids=${audienceIds.split(",")}`,
      {
        method: "POST"
      }
    );
    const data = await res.json();
    setAudienceData(data);
    console.log(data); // { success: true }
  };

  const handleSubmit = async id => {
    const audiences = audienceData;

    const combinedAudience = {
      id: Date.now(),
      name,
      visitors: 0,
      sessionTime: 0,
      bounceRate: 0
    };

    audiences.forEach(audience => {
      combinedAudience.visitors += parseInt(audience.visitors);
      combinedAudience.sessionTime += parseInt(audience.sessionTime);
      combinedAudience.bounceRate += parseInt(audience.bounceRate);
    });

    const numAudiences = audiences.length;
    combinedAudience.visitors /= numAudiences;
    combinedAudience.sessionTime /= numAudiences;
    combinedAudience.bounceRate /= numAudiences;

    const updateAudiences = audiences.filter(
      audience => !audienceIds.includes(audience.id)
    );
    const res = fetch("/api/update-audiences", {
      method: "POST",
      body: JSON.stringify([...updateAudiences, combinedAudience])
    });

    if (res.ok) {
      console.log("Audiences updated successfully");
    } else {
      console.log("Error updating audiences");
    }
  };

  return (
    <form className="flex flex-col gap-4 w-1/2 m-auto">
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        className="p-2 border rounded"
        placeholder="Audience Name"
      />
      <input
        type="text"
        value={audienceIds}
        onChange={e => setAudienceIds(e.target.value)}
        className="p-2 border rounded"
        placeholder="Audience IDs"
      />
      <button
        onClick={() => handleSubmitGet()}
        className="p-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors"
      >
        Get
      </button>
      <button
        onClick={() => handleSubmit()}
        className="p-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors"
      >
        Merge Audiences
      </button>
    </form>
  );
};

export default AudienceMerger;

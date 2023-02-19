import { useState, useEffect } from "react";
import { useRouter } from "next/router";
//import useSWR from "swr";
// import { trackPageView, trackClick } from "../utils/tracker";

export default function Audience() {
  const [audienceData, setAudienceData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/all-audiences")
      .then(response => response.json())
      .then(data => setAudienceData(data))
      .catch(error => console.error(error));
  }, []);

  const handleAudienceClick = id => {
    const selectedAudience = audienceData.find(audience => audience.id === id);
    const audienceName = selectedAudience.name;
    const audienceId = selectedAudience.id;
    // trackClick(audienceName);
    router.push({
      pathname: `/audience/${audienceId}`,
      query: { name: audienceName }
    });
  };

  const audienceList = audienceData.map(audience => (
    <div
      key={audience.id}
      className="bg-white border rounded-md p-4 shadow-sm mb-4"
    >
      <h2 className="text-xl font-bold">{audience.name}</h2>
      <div className="flex justify-between mt-4">
        <div className="text-gray-500">Visitors</div>
        <div className="text-gray-900">{audience.visitors}</div>
      </div>
      <div className="flex justify-between mt-2">
        <div className="text-gray-500">Session Time</div>
        <div className="text-gray-900">{audience.sessionTime}</div>
      </div>
      <div className="flex justify-between mt-2">
        <div className="text-gray-500">Bounce Rate</div>
        <div className="text-gray-900">{audience.bounceRate}</div>
      </div>
      <button
        className="mt-4 bg-gray-800 text-white rounded-md px-4 py-2 hover:bg-gray-900 transition-all duration-200"
        onClick={() => handleAudienceClick(audience.id)}
      >
        View Details
      </button>
    </div>
  ));

  const audienceListWarning = (
    <div className="bg-white border rounded-md p-4 shadow-sm mb-4">
      You don't have any audience.
    </div>
  );
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Audience List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {audienceData.length <= 0 ? audienceListWarning : audienceList}
      </div>
    </div>
  );
}

async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

//import AudienceInsight from "./AudienceInsight";
//import useSWR from "swr";
// import { trackPageView, trackClick } from "../utils/tracker";

export default function Audience() {
  const [audienceData, setAudienceData] = useState([]);
  const [selectedAudiences, setSelectedAudiences] = useState([]);
  const supabase = useSupabaseClient();
  const session = useSession();
  const user = session.user;

  const router = useRouter();

  // useEffect(() => {
  //   fetch("/api/all-audiences")
  //     .then((response) => response.json())
  //     .then((data) => setAudienceData(data))
  //     .catch((error) => console.error(error));
  // }, []);

  useEffect(() => {
    async function fetchAudiences() {
      const { data, error } = await supabase
        .from("audiences")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) console.log("Error fetching audiences:", error.message);
      else setAudienceData(data);
    }

    fetchAudiences();
  }, [user]);

  const handleAudienceClick = (id) => {
    const selectedAudience = audienceData.find(
      (audience) => audience.id === id
    );
    const audienceName = selectedAudience.name;
    const audienceId = selectedAudience.id;

    router.push({
      pathname: `/audience/${audienceId}`,
      query: { name: audienceName },
    });
  };

  const handleSelectAllClick = () => {
    setSelectedAudiences(audienceData);
  };

  const handleClearSelectionClick = () => {
    setSelectedAudiences([]);
  };

  const handleDeleteSelectedClick = async () => {
    const idsToDelete = selectedAudiences.map((audience) => audience.id);
    console.log(idsToDelete);
    const response = await fetch(`/api/delete-audiences?ids=${idsToDelete}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      const data = await response.json();
      // setAudienceData(data.audiences);
      setSelectedAudiences([]);
      router.reload();
    } else {
      console.error(response.statusText);
    }
  };

  const handleSelectAudience = (audience) => {
    if (selectedAudiences.includes(audience)) {
      setSelectedAudiences(selectedAudiences.filter((a) => a !== audience));
    } else {
      setSelectedAudiences([...selectedAudiences, audience]);
    }
  };

  const audienceList = audienceData.map((audience) => (
    <div
      key={audience.id}
      className="hover:shadow-lg bg-white border rounded-md p-4 shadow-sm mb-4"
    >
      <h2
        onClick={() => handleAudienceClick(audience.id)}
        className="text-2xl font-bold cursor-pointer flex items-center"
      >
        {audience.name}
        {audience.rfmScore && (
          <span class="bg-blue-200  ml-2 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
            RFM
          </span>
        )}
      </h2>
      <div className="flex justify-between mt-4">
        <p className="text-gray-900">
          {audience.description && audience.description}
        </p>
      </div>

      <p className="text-gray-900 mt-2 text-xs">
        Audience ID: {audience.id} | Created At:
        {audience.created_at}
      </p>

      <input
        type="checkbox"
        checked={selectedAudiences.includes(audience)}
        onChange={() => handleSelectAudience(audience)}
        className="float-right hover:cursor w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "
      />
      {/* <AudienceInsight audienceId={audience.id} /> */}
    </div>
  ));

  const audienceListWarning = (
    <div className="bg-white border rounded-md p-4 shadow-sm mb-4 text-sm">
      You don't have any audience yet.
    </div>
  );
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Audience List
          </h2>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4 ">
          <Link href="/upload">
            <span className="ml-3 block">
              <button
                onClick={() => handleSelectAllClick()}
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Upload a new audience
              </button>
            </span>
          </Link>
          <Link href="/create">
            <span className="ml-3 block">
              <button
                onClick={() => handleSelectAllClick()}
                type="button"
                className=" px-4 py-2 text-sm bg-gray-800 text-white rounded-md px-4 py-2 hover:bg-gray-900 transition-all duration-200"
              >
                Create
              </button>
            </span>
          </Link>
        </div>
        <br />
        {selectedAudiences.length > 0 && (
          <div className="mt-5 flex lg:mt-0 lg:ml-4 delete-buttons">
            <span className="ml-3 hidden sm:block">
              <button
                onClick={() => handleClearSelectionClick()}
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Clear
              </button>
            </span>

            <span className="ml-3 hidden sm:block">
              <button
                onClick={() => handleSelectAllClick()}
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Select All
              </button>
            </span>
            <span className="sm:ml-3">
              <button
                onClick={() => handleDeleteSelectedClick()}
                type="button"
                className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
                Delete Selected
              </button>
            </span>
          </div>
        )}
      </div>
      <div className="grid gr gap-4 mt-8">
        {audienceData.length <= 0 ? audienceListWarning : audienceList}
      </div>
    </div>
  );
}

async function fetcher(url) {
  const res = await fetch(url);
  return res.json();
}

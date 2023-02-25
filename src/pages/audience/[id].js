import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import collect from "collect.js";
import DataTable from "../../components/dataTable";
import ThisTable from "../../components/thisTable";
import TremorTable from "../../components/tremorTable";
//import AdvancedFilter from "../../components/advancedFilter";

const Audience = () => {
  const [audience, setAudience] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [metrics, setMetrics] = useState([]);

  const router = useRouter();
  const { id } = router.query;

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
          setGroupedData(data);
          setAudience(data);
        }
      } catch (error) {
        console.log("Error fetching audience data:", error.message);
      }
    };

    const fetchMetricsData = async () => {
      try {
        const res = await fetch(`/api/get-metrics?id=${id}`);
        const { data, error } = await res.json();
        if (error) {
          console.log("Error fetching metrics data:", error.message);
        } else {
          setMetrics(data);
        }
      } catch (error) {
        console.log("Error fetching metrics data:", error.message);
      }
    };

    fetchAudienceData();
    fetchMetricsData();
  }, [id]);
  // const fetchAudience = async () => {
  //   if (id) {

  //     if (error) {
  //       console.log("Error fetching audience IDs:", error.message);
  //     } else {
  //       setGroupedData(data);
  //       setAudience(data);
  // const audienceIds = data.map((row) => row.audience_id);
  // const groupedData = collect(data)
  //   .groupBy("session_id")
  //   .map((session) => {
  //     const uniqueAudienceIds = session
  //       .pluck("audience_id")
  //       .unique()
  //       .all();
  //     return {
  //       session_id: session.first().session_id,
  //       audience_ids: uniqueAudienceIds,
  //       events: session.all(),
  //     };
  //   })
  //   .all();
  // const groupedData = collect(data)
  //   .groupBy("audience_id")
  //   .map((items, audience_id) => {
  //     return {
  //       audience_id: audience_id,
  //       sessions: collect(items).groupBy("session_id").all(),
  //     };
  //   })
  //   .all();
  // console.log("groupedData:", groupedData);
  // setGroupedData(groupedData);
  //   }
  // }

  // const res = await fetch(`/api/get-audience?id=${id}`);
  //   };

  //   fetchAudience();
  // }, [id]);

  if (!id) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (id) => {
    const res = await fetch(`/api/delete-audience?id=${id}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push({
        pathname: `/audiences`,
      });
    }
  };

  return (
    <>
      <Link href="/audiences">
        <span className="ml-3 block">
          <button
            // onClick={() => handleSelectAllClick()}
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Back to audiences
          </button>
        </span>
      </Link>
      {audience.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6 w-1/1  m-5 m-auto">
          <h1 className="text-3xl font-bold mb-2">{audience[0].name}</h1>
          <p className="text-md mb-2 ">{audience[0].description}</p>
          <p className="text-sm mb-2 text-gray-500">{audience[0].id}</p>
          <p className="text-sm mb-2 text-gray-500">{audience[0].created_at}</p>
          {/* <DataTable data={groupedData} /> */}{" "}
          {/* <ThisTable data={groupedData} /> */}
          <TremorTable data={metrics} />
          {/* <table>
          <thead>
            <tr>
              <th>Session ID</th>
              <th>Total Events</th>
              <th>Conversion Count</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table> */}
          {/* {audience.rfmScore ? (
          <div>
           <AdvancedFilter data={audience.rfmScore} /> 

            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Purchase Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Purchase Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Recency
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Frequency
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Monetary
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {audience.rfmScore.map((customer) => (
                  <tr key={customer.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {customer.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {customer.purchaseAmount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {customer.purchaseDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {customer.recency}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {customer.frequency}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {customer.monetary}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null} */}
          {audience.length > 0 && (
            <button
              onClick={() => handleDelete(audience[0].id)}
              type="button"
              className="mt-10 inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
                  F
                />
              </svg>
              Delete Audience
            </button>
          )}
        </div>
      )}
    </>
  );
};
export default Audience;

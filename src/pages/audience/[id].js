import { useEffect, useState } from "react";
import Link from "next/link";
// import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import collect from "collect.js";
// import DataTable from "../../components/dataTable";
// import ThisTable from "../../components/thisTable";
import TremorTable from "../../components/tremorTable";
import {
  Card,
  Metric,
  BarList,
  Text,
  AreaChart,
  BadgeDelta,
  Flex,
  ColGrid,
} from "@tremor/react";
//import AdvancedFilter from "../../components/advancedFilter";

const Audience = () => {
  const [audience, setAudience] = useState([]);
  const [addToCart, setAddtoCart] = useState([]);
  const [productView, setProductView] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [goals, setGoals] = useState([]);

  const categories = [
    {
      title: "Add to Cart",
      key: "add_to_cart",
      metric: addToCart?.length,
    },
    {
      title: "Product Views",
      key: "product_view",
      metric: productView?.length,
    },
  ];

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
          setAudience(data);
        }
      } catch (error) {
        console.log("Error fetching audience data:", error.message);
      }
    };

    const fetchMetricsData = async () => {
      try {
        const res = await fetch(
          `/api/get-metrics?id=${id}&event_type=add_to_cart`
        );
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

    const fetchMetricsAddToCart = async () => {
      try {
        const res = await fetch(
          `/api/get-metrics?id=${id}&event_type=add_to_cart`
        );
        const { data, error } = await res.json();
        if (error) {
          console.log("Error fetching metrics data:", error.message);
        } else {
          setAddtoCart(data);
        }
      } catch (error) {
        console.log("Error fetching metrics data:", error.message);
      }
    };

    const fetchMetricsProductView = async () => {
      try {
        const res = await fetch(
          `/api/get-metrics?id=${id}&event_type=product_view`
        );
        const { data, error } = await res.json();
        if (error) {
          console.log("Error fetching metrics data:", error.message);
        } else {
          setProductView(data);
        }
      } catch (error) {
        console.log("Error fetching metrics data:", error.message);
      }
    };

    fetchAudienceData();
    fetchMetricsProductView();
    fetchMetricsAddToCart();
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

  const addToCartUnique = {};
  addToCart.forEach((event) => {
    const productId = event.event_data.productId;
    if (!addToCartUnique[productId]) {
      addToCartUnique[productId] = 1;
    } else {
      addToCartUnique[productId] += 1;
    }
  });

  const convertedaddToCartUnique = Object.entries(addToCartUnique).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const handleGoalChange = (index, key, value) => {
    const newGoals = [...goals];
    newGoals[index][key] = value;
    setGoals(newGoals);
  };

  const handleAddGoal = () => {
    setGoals([...goals, { key: "", operator: "equal", value: "" }]);
  };

  const handleRemoveGoal = (index) => {
    const newGoals = [...goals];
    newGoals.splice(index, 1);
    setGoals(newGoals);
  };

  const handleSaveGoals = async (id) => {
    const res = await fetch("/api/create-audience", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        goals,
      }),
    });
  };

  console.log(goals);
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
          <br />
          {/* <DataTable data={groupedData} /> */}
          {/* <ThisTable data={metrics} /> */}
          <div>
            <h1>Edit Goals for Audience {id}</h1>
            <button onClick={handleAddGoal}>Add Goal</button>
            {goals.map((goal, index) => (
              <div key={index}>
                <select
                  value={goal.key}
                  onChange={(e) =>
                    handleGoalChange(index, "key", e.target.value)
                  }
                >
                  <option value="event_type">Event Type</option>
                  <option value="ssss">sss</option>
                  {/* Add more options here */}
                </select>
                <select
                  value={goal.operator}
                  onChange={(e) =>
                    handleGoalChange(index, "operator", e.target.value)
                  }
                >
                  <option value="equal">Equal</option>
                  <option value="not_equal">Not Equal</option>
                  {/* Add more options here */}
                </select>
                <input
                  type="text"
                  value={goal.value}
                  onChange={(e) =>
                    handleGoalChange(index, "value", e.target.value)
                  }
                />
                <button onClick={() => handleRemoveGoal(index)}>Remove</button>
              </div>
            ))}
            <button onClick={handleSaveGoals}>Save</button>
          </div>

          <ColGrid numColsSm={2} numColsLg={3} gapX="gap-x-6" gapY="gap-y-6">
            {categories.map((item) => (
              <Card key={item.title} className="mb-5">
                <Flex alignItems="items-start">
                  <Text>{item.title}</Text>
                </Flex>
                <Flex
                  justifyContent="justify-start"
                  alignItems="items-baseline"
                  spaceX="space-x-3"
                  truncate={true}
                >
                  <Metric>{item.metric}</Metric>
                </Flex>
              </Card>
            ))}
          </ColGrid>

          <BarList data={convertedaddToCartUnique} marginTop="mt-2" />
          {/* <TremorTable data={metrics} /> */}
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

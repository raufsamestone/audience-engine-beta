import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Audience = () => {
  const [audience, setAudience] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchAudience = async () => {
      const res = await fetch(`/api/get-audience?id=${id}`);
      const data = await res.json();
      setAudience(data);
    };

    if (id) {
      fetchAudience();
    }
  }, [id]);

  if (!audience) {
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
      <a href="/audiences">
        <span className="ml-3 block">
          <button
            onClick={() => handleSelectAllClick()}
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Back to audiences
          </button>
        </span>
      </a>

      <div className="bg-white rounded-lg shadow-sm p-6 w-1/1  m-5 m-auto">
        <h1 className="text-3xl font-bold mb-2">{audience.name}</h1>
        <p className="text-lg mb-2">Total Visitors: {audience.visitors}</p>
        <p className="text-lg mb-2">Session Time: {audience.sessionTime}</p>
        <p className="text-lg mb-2">Bounce Rate: {audience.bounceRate}</p>
        {audience.rfmScore ? (
          <div>
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
        ) : null}

        <button
          onClick={() => handleDelete(audience.id)}
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
      </div>
    </>
  );
};

export default Audience;

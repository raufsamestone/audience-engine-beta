import React, { useState } from "react";
import { useRouter } from "next/router";

const CreateAudience = ({ csvData, csvDataFileName }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateAudience = async () => {
    const audienceData = {
      name: name,
      description: description,

      rfmScore: calculateRFMScores(csvData),
    };
    const res = await fetch("/api/create-audience", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(audienceData),
    });
    const data = await res.json();
    console.log({ data }); // { success: true }

    setName("");
    setDescription("");
    router.push({
      pathname: `/audiences`,
    });
  };

  const calculateRFMScores = (data) => {
    const calculateRecency = (purchaseDate) => {
      const today = new Date();
      const latestDate = new Date(purchaseDate);
      const diffTime = Math.abs(today - latestDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };

    const calculateFrequency = (data, name) => {
      const filteredData = data.filter((item) => item.name === name);
      const uniqueDates = [
        ...new Set(filteredData.map((item) => item.purchaseDate)),
      ];
      return uniqueDates.length;
    };

    const calculateMonetary = (data, name) => {
      const filteredData = data.filter((item) => item.name === name);
      const totalAmount = filteredData.reduce(
        (acc, cur) => acc + cur.purchaseAmount,
        0
      );
      return totalAmount;
    };

    const rfmScores = [];

    for (let i = 0; i < data.length; i++) {
      const recency = calculateRecency(data[i].purchaseDate);
      const frequency = calculateFrequency(data, data[i].name);
      const monetary = calculateMonetary(data, data[i].name);

      rfmScores.push({
        id: data[i].id,
        name: data[i].name,
        purchaseAmount: data[i].purchaseAmount,
        purchaseDate: data[i].purchaseDate,
        recency: recency,
        frequency: frequency,
        monetary: monetary,
      });
    }
    return rfmScores;
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl  mb-4">
        Create Audience{" "}
        <span className="font-bold ">
          {" "}
          {csvDataFileName && "with" + " " + csvDataFileName}
        </span>
      </h2>
      <div className="mb-4">
        <label className="block mb-2">
          <span className="text-gray-700">Name:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          <span className="text-gray-700">Description:</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          ></textarea>
        </label>
      </div>
      <button
        onClick={handleCreateAudience}
        className=" px-4 py-2 text-sm bg-gray-800 text-white rounded-md px-4 py-2 hover:bg-gray-900 transition-all duration-200"
      >
        Create Audience with RFM
      </button>
    </div>
  );
};

export default CreateAudience;

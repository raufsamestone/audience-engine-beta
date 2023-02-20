import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import CreateAudienceFromCSV from "./utils/createAudience";

const CsvUploader = () => {
  const [csvData, setCsvData] = useState([]);
  const [csvDataFileName, setCsvDataFileNAme] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    setCsvDataFileNAme(file);
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setCsvData(results.data);
      },
    });
  };

  return (
    <div>
      <div>
        <label
          htmlFor="file-upload"
          class="block text-sm font-medium text-gray-700"
        >
          Choose a file to upload:
        </label>
        <div class="mt-1 flex items-center">
          <div class="relative">
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              class="sr-only"
              onChange={handleFileUpload}
            />
            <div class="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
              </label>
              <p class="pl-1">or drag and drop</p>
            </div>
          </div>
        </div>
      </div>
      {csvData.length > 0 && (
        <>
          <CreateAudienceFromCSV
            csvData={csvData}
            csvDataFileName={csvDataFileName?.name}
          />
        </>
      )}
    </div>
  );
};

export default CsvUploader;

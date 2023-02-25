import React from "react";
import collect from "collect.js";

function DataTable({ data }) {
  const nestedData = {};

  data.forEach((item) => {
    const id = item.session_id;
    const eventData = item.device_type;

    if (!nestedData[id]) {
      nestedData[id] = [];
    }

    nestedData[id].push(eventData);
  });

  console.log("NESTED", nestedData);
  console.log(Object.keys(nestedData));

  const counts = {};
  const countData = Object.keys(nestedData);

  for (const key in countData) {
    const values = countData[key];
    const count = {};

    for (const value of values) {
      count[value] = (count[value] || 0) + 1;
    }

    counts[key] = count;
  }

  console.log(counts);

  // const headers = [
  //   "Session ID",
  //   "Event Data",
  //   "Event Value",
  //   "Is Conversion",
  //   "Device Type",
  //   "Browser",
  //   "Language",
  //   "Screen",
  //   "UTM Params",
  //   "Referrer",
  //   "Timestamp",
  //   "Audience ID",
  // ];

  // const renderTableHeader = () => {
  //   return headers.map((header, index) => {
  //     return <th key={index}>{header}</th>;
  //   });
  // };

  const renderTableData = () => {
    return Object.values(nestedData).map((row, index) => {
      return (
        <tr key={index}>
          <td>{row.length}</td>
        </tr>
      );
    });

    return (
      <table>
        <thead>{/* <tr>{renderTableHeader()}</tr> */}</thead>
        <tbody>{renderTableData()}</tbody>
      </table>
    );
  };
}

export default DataTable;

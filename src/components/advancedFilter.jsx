import { useState } from "react";

function AdvancedFilter({ data }) {
  const [field, setField] = useState("");
  const [operator, setOperator] = useState("IS");
  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  function handleFieldChange(event) {
    setField(event.target.value);
  }

  function handleOperatorChange(event) {
    setOperator(event.target.value);
  }

  function handleValueChange(event) {
    setValue(event.target.value);
  }

  function filterData() {
    const filtered = data.filter((item) => {
      switch (operator) {
        case "IS":
          return item[field] === value;
        case "NOT":
          return item[field] !== value;
        case "CONTAIN":
          return item[field].toLowerCase().includes(value.toLowerCase());
        default:
          return true;
      }
    });

    setFilteredData(filtered);
  }

  return (
    <div>
      <div>
        <select value={field} onChange={handleFieldChange}>
          <option value="">Select a field</option>
          {Object?.keys(data[0]).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <select value={operator} onChange={handleOperatorChange}>
          <option value="IS">IS</option>
          <option value="NOT">NOT</option>
          <option value="CONTAIN">CONTAIN</option>
        </select>
        <input type="text" value={value} onChange={handleValueChange} />
        <button onClick={filterData}>Filter</button>
      </div>
      <table>
        <thead>
          <tr>
            {Object?.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((value) => (
                <td key={value}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdvancedFilter;

import { useState } from "react";

export default function PagePrediction() {
  const [pages, setPages] = useState([]);
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async () => {
    // Send the page URLs to the API for prediction
    const response = await fetch("/api/predict", {
      method: "POST",
      body: JSON.stringify({ pages }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    // Update the prediction state with the result
    setPrediction(data.prediction);
  };

  // /home,/products,/about,/contact,/blog,/blog/post-1,/blog/post-2,/blog/post-3

  return (
    <div>
      <h1>Page Prediction</h1>
      <p>
        Enter the URLs of the pages the user has visited, separated by commas:
      </p>
      <textarea
        value={pages.join(",")}
        onChange={(e) => setPages(e.target.value.split(","))}
      />
      <button onClick={handlePredict}>Predict Next Page</button>
      {prediction && (
        <p>The user is likely to visit the following page: {prediction}</p>
      )}
    </div>
  );
}

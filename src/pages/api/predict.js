// import * as tf from "@tensorflow/tfjs";
// //import path from "path";

// export default async function prediction(req, res) {
//   const model = await tf.loadLayersModel("./model.json");

//   // Make a prediction
//   const input = tf.tensor2d([[1, 2, 3, 4]]);
//   const prediction = model.predict(input);

//   console.log(prediction.toString());
// }

import { loadLayersModel, tensor2d, reshape } from "@tensorflow/tfjs-node";
// import { NextApiRequest, NextApiResponse } from "next";
// import path from "path";

// Load the pre-trained model
// const MODEL_PATH = path.join(process.cwd(), "model");

export default async function predict(req, res) {
  //const model = await loadLayersModel("./model.json");
  const model = await loadLayersModel(
    `file:///Users/raufsamestone/Projects/audience-engine/public/model.json`
  );
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { pages } = req.body;

  console.log(pages);

  // Convert the input array into a tensor
  const input = tensor2d(pages, [1, pages.length]);

  console.log(input);
  // Run the prediction
  const prediction = model.predict(input);

  // Convert the prediction tensor to an array
  const predictionArray = await prediction.array();
  console.log(predictionArray);

  // Send the prediction back to the client
  res.status(200).json({ prediction: predictionArray[0] });
}

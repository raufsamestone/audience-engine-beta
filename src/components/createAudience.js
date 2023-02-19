import { useState } from "react";
import { useRouter } from "next/router";


const CreateAudience = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [visitors, setVisitors] = useState(0);
  const [sessionTime, setSessionTime] = useState("");
  const [bounceRate, setBounceRate] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch("/api/create-audience", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, visitors, sessionTime, bounceRate })
    });
    const data = await res.json();
    router.push({
      pathname: `/audiences`
    });
    console.log(data); // { success: true }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/2 m-auto">
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        className="p-2 border rounded"
        placeholder="Audience Name"
      />
      <input
        type="number"
        value={visitors}
        onChange={e => setVisitors(e.target.value)}
        className="p-2 border rounded"
        placeholder="Visitors"
      />
      <input
        type="text"
        value={sessionTime}
        onChange={e => setSessionTime(e.target.value)}
        className="p-2 border rounded"
        placeholder="Session Time"
      />
      <input
        type="text"
        value={bounceRate}
        onChange={e => setBounceRate(e.target.value)}
        className="p-2 border rounded"
        placeholder="Bounce Rate"
      />
      <button
        type="submit"
        className="p-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors"
      >
        Create Audience
      </button>
    </form>
  );
};

export default CreateAudience;

// import React, { useState } from "react";
// import ReactFlow, { Controls, MiniMap } from "reactflow";
// import 'reactflow/dist/style.css';

// const nodeTypes = {
//   default: ({ data }) => (
//     <div className="border border-gray-200 rounded-md p-2">
//       {data.label}
//       <p className="text-xs mt-1 text-gray-500">Visitors: {data.visitors}</p>
//       <p className="text-xs mt-1 text-gray-500">
//         Bounce Rate: {data.bounceRate}%
//       </p>
//       <p className="text-xs mt-1 text-gray-500">
//         Session Time: {data.sessionTime} s
//       </p>
//     </div>
//   ),
// };

// const CreateAudience = () => {
//   const [elements, setElements] = useState([]);

//   const onConnect = (params) => {
//     const newEdge = {
//       id: `edge-${params.source}-${params.target}`,
//       source: params.source,
//       target: params.target,
//     };
//     setElements((els) => els.concat(newEdge));
//   };

//   const onElementsRemove = (elementsToRemove) =>
//     setElements((els) => els.filter((el) => !elementsToRemove.includes(el)));

//   const addNewNode = () => {
//     const newNode = {
//       id: (elements.length + 1).toString(),
//       type: "default",
//       position: { x: Math.random() * 500, y: Math.random() * 500 },
//       data: {
//         label: `Audience ${elements.length + 1}`,
//         visitors: Math.floor(Math.random() * 10000),
//         bounceRate: Math.floor(Math.random() * 100),
//         sessionTime: Math.floor(Math.random() * 1000),
//       },
//     };

//     setElements((els) => els.concat(newNode));
//   };

//   return (
//     <div className="h-screen flex overflow-hidden bg-gray-100">
//       <div className="flex flex-col w-64">
//         <div className="bg-white border-b border-gray-200 flex justify-between items-center px-4 py-3">
//           <h2 className="text-lg font-medium">Create a New Audience</h2>
//         </div>
//         <div className="flex-1 flex flex-col overflow-y-auto">
//           <div className="flex-1 flex flex-col p-4">
//             <div className="mb-4">
//               <button
//                 onClick={addNewNode}
//                 className="bg-blue-500 text-white rounded-md px-4 py-2"
//               >
//                 Add New Audience
//               </button>
//             </div>
//             <ReactFlow
//               nodes={elements}
//               nodeTypes={nodeTypes}
//               onConnect={onConnect}
//               onElementsRemove={onElementsRemove}
//             >
//               <MiniMap />
//               <Controls />
//             </ReactFlow>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateAudience;

// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { getJob } from "../../lib/api";

// export default function JobDetail() {
//   const { id } = useParams(); // ✅ correct way
//   const [job, setJob] = useState(null);

//   useEffect(() => {
//     if (!id) return;

//     getJob(id).then(setJob);
//   }, [id]);

//   if (!job) return <p className="p-8">Loading...</p>;

//   return (
//     <div className="p-8">
//       <h1 className="text-xl font-bold mb-4">{job.taskName}</h1>
//       <p>Status: {job.status}</p>
//       <p>Priority: {job.priority}</p>

//       <pre className=" p-4 mt-4 overflow-auto">
//         {JSON.stringify(JSON.parse(job.payload), null, 2)}
//       </pre>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { getJob } from "../../lib/api";

// export default function JobDetail() {
//   const { id } = useParams();
//   const [job, setJob] = useState(null);

//   useEffect(() => {
//     if (!id) return;
//     getJob(id).then(setJob);
//   }, [id]);

//   if (!job) return <p className="p-8">Loading...</p>;

//   const payload =
//     typeof job.payload === "string"
//       ? JSON.parse(job.payload)
//       : job.payload;

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">Job Details</h1>

//       <table className="w-full max-w-xl border border-gray-700">
//         <tbody>
//           <tr className="border-b border-gray-700">
//             <td className="p-3 font-semibold text-gray-300">Task Name</td>
//             <td className="p-3">{job.taskName}</td>
//           </tr>

//           <tr className="border-b border-gray-700">
//             <td className="p-3 font-semibold text-gray-300">Priority</td>
//             <td className="p-3 capitalize">{job.priority}</td>
//           </tr>

//           <tr className="border-b border-gray-700">
//             <td className="p-3 font-semibold text-gray-300">Status</td>
//             <td className="p-3 capitalize">{job.status}</td>
//           </tr>

//           <tr>
//             <td className="p-3 font-semibold text-gray-300 align-top">
//               Payload
//             </td>
//             <td className="p-3">
//               <pre className="bg-gray-900 p-3 rounded text-sm overflow-auto">
//                 {JSON.stringify(payload, null, 2)}
//               </pre>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getJob } from "../../lib/api";

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    if (!id) return;
    getJob(id).then(setJob);
  }, [id]);

  if (!job) return <p className="p-8">Loading...</p>;

  const payload =
    typeof job.payload === "string"
      ? JSON.parse(job.payload)
      : job.payload;

  return (
    <div className="p-8">
      {/* Centered container */}
      <div className="max-w-xl mx-auto">
        {/* Centered title */}
        <h1 className="text-2xl font-bold mb-6 text-center">
          Job Details
        </h1>

        <table className="w-full border border-gray-700">
          <tbody>
            <tr className="border-b border-gray-700">
              <td className="p-3 font-semibold text-gray-300 border-r border-gray-700 w-1/3">
                Task Name
              </td>
              <td className="p-3">{job.taskName}</td>
            </tr>

            <tr className="border-b border-gray-700">
              <td className="p-3 font-semibold text-gray-300 border-r border-gray-700">
                Priority
              </td>
              <td className="p-3 capitalize">{job.priority}</td>
            </tr>

            <tr className="border-b border-gray-700">
              <td className="p-3 font-semibold text-gray-300 border-r border-gray-700">
                Status
              </td>
              <td className="p-3 capitalize">{job.status}</td>
            </tr>

            <tr>
              <td className="p-3 font-semibold text-gray-300 border-r border-gray-700 align-top">
                Payload
              </td>
              <td className="p-3">
                <pre className="bg-gray-900 p-3 rounded text-sm overflow-auto">
                  {JSON.stringify(payload, null, 2)}
                </pre>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

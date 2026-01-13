"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getJob } from "../../lib/api";

export default function JobDetail() {
  const params = useParams();
  const id = params?.id;

  const [job, setJob] = useState(null);

  useEffect(() => {
    if (!id) return;
    getJob(id).then(setJob);
  }, [id]);

  if (!job) return <p className="p-8">Loading...</p>;

  let payload = {};
  try {
    payload =
      typeof job.payload === "string"
        ? JSON.parse(job.payload || "{}")
        : job.payload || {};
  } catch {
    payload = {};
  }

  return (
    <div className="p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Job Details</h1>

        <table className="w-full border border-gray-600 border-collapse">
          <tbody>
            <tr className="border-b border-gray-600">
              <td className="p-3 font-semibold text-gray-300 border-r border-gray-600 w-1/3">
                Task Name
              </td>
              <td className="p-3">{job.taskName}</td>
            </tr>

            <tr className="border-b border-gray-600">
              <td className="p-3 font-semibold text-gray-300 border-r border-gray-600">
                Priority
              </td>
              <td className="p-3 capitalize">{job.priority}</td>
            </tr>

            <tr className="border-b border-gray-600">
              <td className="p-3 font-semibold text-gray-300 border-r border-gray-600">
                Status
              </td>
              <td className="p-3 capitalize">{job.status}</td>
            </tr>

            <tr>
              <td className="p-3 font-semibold text-gray-300 border-r border-gray-600 align-top">
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


"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getJobs, runJob } from "./lib/api";


export default function Dashboard() {
  const [jobs, setJobs] = useState([]);

  const loadJobs = async () => {
    const data = await getJobs();
    setJobs(data);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleRun = async (id) => {
    await runJob(id);
    loadJobs();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-center">Job Scheduler Dashboard</h1>
        <Link
          href="/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Job
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-black">
            <th className="p-2 border">Task</th>
            <th className="p-2 border">Priority</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td className="p-2 border">
                <Link href={`/jobs/${job.id}`} className="underline">
                  {job.taskName}
                </Link>
              </td>
              <td className="p-2 border">{job.priority}</td>
              <td className="p-2 border">{job.status}</td>
              <td className="p-2 border">
                <button
                  disabled={job.status === "completed"}
                  onClick={() => handleRun(job.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
                >
                  Run Job
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

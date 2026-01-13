"use client";
import { useState } from "react";
import { createJob } from "../lib/api";
import { useRouter } from "next/navigation";

export default function CreateJob() {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("Low");
  const [payload, setPayload] = useState("{}");

  const router = useRouter();

 const handleSubmit = async () => {
  try {
    let parsedPayload = {};
try {
  parsedPayload = payload.trim() ? JSON.parse(payload) : {};
} catch {
  alert("Payload must be valid JSON like {}");
  return;
}


    await createJob({
      taskName,
      priority,
      payload: parsedPayload,
    });

    router.push("/");
  } catch (err) {
    alert("Payload must be valid JSON");
    console.error(err);
  }
};


  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Create Job</h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />

      <select
        className="border p-2 w-full mb-3 bg-black text-white"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <textarea
        className="border p-2 w-full mb-3 h-40"
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create Job
      </button>
    </div>
  );
}

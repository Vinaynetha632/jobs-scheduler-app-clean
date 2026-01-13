const API_BASE = "http://localhost:5000/api";

export const getJobs = async (params = "") => {
  const res = await fetch(`${API_BASE}/jobs${params}`);
  return res.json();
};

export const getJob = async (id) => {
  const res = await fetch(`${API_BASE}/jobs/${id}`);
  return res.json();
};

export const createJob = async (data) => {
  const res = await fetch(`${API_BASE}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const runJob = async (id) => {
  const res = await fetch(`${API_BASE}/run-job/${id}`, {
    method: "POST",
  });
  return res.json();
};

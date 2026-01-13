const db = require("../database/db");

// 1️ CREATE JOB
exports.createJob = (req, res) => {
  try {
    const { taskName, payload, priority } = req.body;

    if (!taskName || !payload || !priority) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let payloadString;
    try {
      payloadString =
        typeof payload === "string" ? payload : JSON.stringify(payload);
    } catch {
      return res.status(400).json({ message: "Invalid JSON payload" });
    }

    const stmt = db.prepare(`
      INSERT INTO jobs (taskName, payload, priority, status)
      VALUES (?, ?, ?, 'pending')
    `);

    const result = stmt.run(taskName, payloadString, priority);

    res.status(201).json({
      message: "Job created successfully",
      jobId: result.lastInsertRowid,
    });
  } catch (error) {
    console.error("Create job error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 2️ LIST JOBS
exports.getJobs = (req, res) => {
  try {
    const { status, priority } = req.query;

    let query = "SELECT * FROM jobs WHERE 1=1";
    const params = [];

    if (status) {
      query += " AND status = ?";
      params.push(status);
    }

    if (priority) {
      query += " AND priority = ?";
      params.push(priority);
    }

    query += " ORDER BY createdAt DESC";

    const jobs = db.prepare(query).all(...params);
    res.json(jobs);
  } catch (error) {
    console.error("Get jobs error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 3 JOB DETAIL
exports.getJobById = (req, res) => {
  try {
    const { id } = req.params;

    const job = db
      .prepare("SELECT * FROM jobs WHERE id = ?")
      .get(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    console.error("Get job error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const { runJobById } = require("../services/jobRunner.service");

exports.runJob = async (req, res) => {
  try {
    const { id } = req.params;

    await runJobById(id);

res.json({
  message: "Job started",
});

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

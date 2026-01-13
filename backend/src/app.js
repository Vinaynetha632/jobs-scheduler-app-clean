const express = require("express");
const cors = require("cors");

// Initialize SQLite DB (creates DB + table)
require("./database/db");

const jobsRoutes = require("./routes/jobs.routes");

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api", jobsRoutes);
// Health check
app.get("/", (req, res) => {
  res.json({ message: "Job Scheduler API running" });
});

module.exports = app;


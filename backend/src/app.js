const express = require("express");
const cors = require("cors");

// Initialize SQLite DB
require("./database/db");

const jobsRoutes = require("./routes/jobs.routes");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api", jobsRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Job Scheduler API running" });
});

module.exports = app;


const express = require("express");
const router = express.Router();

const {
  createJob,
  getJobs,
  getJobById,
  runJob,
} = require("../controllers/jobs.controller");

router.post("/jobs", createJob);
router.get("/jobs", getJobs);
router.get("/jobs/:id", getJobById);
router.post("/run-job/:id", runJob);

module.exports = router;

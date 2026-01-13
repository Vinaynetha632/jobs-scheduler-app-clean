const db = require("../database/db");
const { triggerWebhook } = require("./webhook.service");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// exports.runJobById = async (jobId) => {
//   // 1️⃣ Fetch job
//   const job = db.prepare("SELECT * FROM jobs WHERE id = ?").get(jobId);

//   if (!job) {
//     throw new Error("Job not found");
//   }

//   if (job.status === "completed") {
//     throw new Error("Job already completed");
//   }

//   // 2️⃣ Set status to running
//   db.prepare(
//     "UPDATE jobs SET status = 'running', updatedAt = CURRENT_TIMESTAMP WHERE id = ?"
//   ).run(jobId);

//   // 3️⃣ Simulate processing
//   await sleep(3000);

//   // 4️⃣ Set status to completed
//   db.prepare(
//     "UPDATE jobs SET status = 'completed', updatedAt = CURRENT_TIMESTAMP WHERE id = ?"
//   ).run(jobId);

//   const completedJob = db
//     .prepare("SELECT * FROM jobs WHERE id = ?")
//     .get(jobId);

//   // 5️⃣ Trigger webhook
//   await triggerWebhook(completedJob);

//   return completedJob;
// };
exports.runJobById = async (jobId) => {
  const job = db.prepare("SELECT * FROM jobs WHERE id = ?").get(jobId);

  if (!job) throw new Error("Job not found");
  if (job.status === "completed") throw new Error("Job already completed");

  // 1️⃣ Set status to running immediately
  db.prepare(
    "UPDATE jobs SET status = 'running', updatedAt = CURRENT_TIMESTAMP WHERE id = ?"
  ).run(jobId);

  // 2️⃣ Run job in background
  setTimeout(async () => {
    db.prepare(
      "UPDATE jobs SET status = 'completed', updatedAt = CURRENT_TIMESTAMP WHERE id = ?"
    ).run(jobId);

    const completedJob = db
      .prepare("SELECT * FROM jobs WHERE id = ?")
      .get(jobId);

    await triggerWebhook(completedJob);
  }, 3000);

  // 3️⃣ Return immediately
  return { message: "Job started" };
};

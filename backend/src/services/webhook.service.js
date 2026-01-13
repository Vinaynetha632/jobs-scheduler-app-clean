const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

exports.triggerWebhook = async (job) => {
  const webhookUrl = process.env.WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("Webhook URL not configured");
    return;
  }

  const payload = {
    jobId: job.id,
    taskName: job.taskName,
    priority: job.priority,
    payload: JSON.parse(job.payload),
    completedAt: new Date().toISOString(),
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await response.text();

    console.log("Webhook sent:", {
      status: response.status,
      response: text,
    });
  } catch (error) {
    console.error("Webhook failed:", error.message);
  }
};

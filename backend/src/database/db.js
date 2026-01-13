const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "jobs.db"));


db.prepare(`
  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    taskName TEXT NOT NULL,
    payload TEXT NOT NULL,
    priority TEXT CHECK(priority IN ('Low', 'Medium', 'High')) NOT NULL,
    status TEXT CHECK(status IN ('pending', 'running', 'completed')) DEFAULT 'pending',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

module.exports = db;

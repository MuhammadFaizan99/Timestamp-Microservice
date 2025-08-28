// index.js
// where your node app starts

// init project
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// enable CORS so FCC can test it remotely
app.use(cors({ optionsSuccessStatus: 200 }));

// static assets
app.use(express.static("public"));

// root page
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// sample endpoint kept for FCC runner
app.get("/api/hello", (_req, res) => {
  res.json({ greeting: "hello API" });
});

/**
 * Timestamp API
 * - GET /api            -> current time
 * - GET /api/:date      -> parse date string or unix (sec/ms)
 * Returns: { unix, utc } or { error: "Invalid Date" }
 */

app.get("/api", (_req, res) => {
  const d = new Date();
  res.json({ unix: d.getTime(), utc: d.toUTCString() });
});

app.get("/api/:date", (req, res) => {
  let { date } = req.params;

  // If all digits: treat as UNIX epoch (support seconds or milliseconds)
  if (/^\d+$/.test(date)) {
    const n = Number(date);
    date = date.length === 10 ? n * 1000 : n;
  }

  const d = new Date(date);
  if (isNaN(d.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({ unix: d.getTime(), utc: d.toUTCString() });
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

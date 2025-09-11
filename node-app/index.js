const express = require("express");
const client = require("prom-client");
const path = require("path");

const app = express();
app.use(express.json());

// ---- In-memory data store ----
let items = [];

// ---- Prometheus metrics ----
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"]
});

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.3, 0.5, 1, 2, 5]
});

// ---- Middleware to track metrics & log requests ----
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status: res.statusCode
    });
    end({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status: res.statusCode
    });

    // 👇 Log every request (Loki will scrape this via Promtail)
    console.log(
      JSON.stringify({
        level: "info",
        message: `${req.method} ${req.originalUrl} -> ${res.statusCode}`,
        timestamp: new Date().toISOString()
      })
    );
  });
  next();
});

// ---- Serve UI ----
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ---- API Routes ----
app.get("/items", (req, res) => {
  console.log(`Fetching items: ${JSON.stringify(items)}`);
  res.json(items);
});

app.post("/items", (req, res) => {
  items.push(req.body.item);
  console.log(`Item added: ${req.body.item}`);
  res.status(201).json({ message: "Item added", items });
});

app.delete("/items/:index", (req, res) => {
  const idx = parseInt(req.params.index);
  if (idx >= 0 && idx < items.length) {
    const removed = items[idx];
    items.splice(idx, 1);
    console.log(`Item deleted: ${removed}`);
    res.json({ message: "Item deleted", items });
  } else {
    console.log(`Delete failed at index: ${idx}`);
    res.status(404).json({ message: "Item not found" });
  }
});

// ---- Prometheus metrics endpoint ----
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// ---- Start server ----
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Node app running on http://localhost:${PORT}`);
});


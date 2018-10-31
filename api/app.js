const express = require("express");
const path = require("path");
const todoRoutes = require("./routes/todos");

const app = express();

app.use(express.static(path.join(__dirname, "client", "build")));

// app.use("/api", todoRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

module.exports = app;

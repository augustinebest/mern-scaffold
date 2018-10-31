const express = require("express");
const path = require("path");
require("dotenv").config();

const todoRoutes = require("./api/routes/todos");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, "client", "build")));

app.use("/api", todoRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`server now running on port ${port}`);
});

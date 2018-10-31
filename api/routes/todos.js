const express = require("express");

const router = express.Router();

router.get("/todos", (req, res, next) => {
  res.json({ message: "get all todos" });
});

module.exports = router;

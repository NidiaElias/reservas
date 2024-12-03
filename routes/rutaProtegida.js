const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/principal", (req, res) => {
  res.sendFile(path.join(path.resolve(), "views", "index.html"));
});

router.get("/usuarios", (req, res) => {
  res.sendFile(path.join(path.resolve(), "views", "usuarios.html"));
});

module.exports = router;

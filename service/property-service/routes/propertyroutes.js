const express = require("express");
const pool = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM properties");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { title, location, price, status } = req.body;

  await pool.query(
    "INSERT INTO properties (title, location, price, status) VALUES (?, ?, ?, ?)",
    [title, location, price, status]
  );

  res.status(201).json({
    success: true,
    message: "Property added"
  });
});

module.exports = router;

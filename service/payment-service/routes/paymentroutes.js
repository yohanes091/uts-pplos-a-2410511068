const express = require("express");
const pool = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM payments");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { user_id, property_id, amount, payment_method, status } = req.body;

  await pool.query(
    "INSERT INTO payments (user_id, property_id, amount, payment_method, status) VALUES (?, ?, ?, ?, ?)",
    [user_id, property_id, amount, payment_method, status]
  );

  res.status(201).json({
    success: true,
    message: "Payment recorded"
  });
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("../config/passport");
const pool = require("../config/db");
const {
  generateAccessToken,
  generateRefreshToken
} = require("../utils/jwt");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, role || "user"]
  );

  res.status(201).json({
    success: true,
    message: "User registered"
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }

  const user = rows[0];

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.json({
    accessToken,
    refreshToken
  });
});

router.post("/refresh", (req, res) => {
  const { refreshToken } = req.body;

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET
    );

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  } catch {
    res.status(403).json({
      message: "Invalid refresh token"
    });
  }
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false
  }),
  (req, res) => {
    const token = jwt.sign(
      {
        email: req.user.emails[0].value
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({
      success: true,
      accessToken: token
    });
  }
);

module.exports = router;

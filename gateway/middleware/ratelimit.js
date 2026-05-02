const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: {
    success: false,
    message: "Too many requests, try again later"
  },
  standardHeaders: true,
  legacyHeaders: false
});

const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.json({
    service: "Auth Service",
    status: "Running"
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Auth Service running on port ${process.env.PORT}`);
});

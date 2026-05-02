const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/payments", require("./routes/paymentRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Payment Service running on ${process.env.PORT}`);
});

const express = require("express");
const dotenv = require("dotenv");
const rateLimiter = require("./middleware/rateLimiter");

dotenv.config();

const app = express();

app.use(express.json());
app.use(rateLimiter);

require("./routes/authRoutes")(app);
require("./routes/propertyRoutes")(app);
require("./routes/paymentRoutes")(app);

app.get("/", (req, res) => {
  res.json({
    service: "API Gateway",
    status: "Running"
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Gateway running on port ${process.env.PORT}`);
});

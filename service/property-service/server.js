const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/properties", require("./routes/propertyRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Property Service running on ${process.env.PORT}`);
});

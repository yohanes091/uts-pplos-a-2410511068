const { createProxyMiddleware } = require("http-proxy-middleware");
const authMiddleware = require("../middleware/authMiddleware");
require("dotenv").config();

module.exports = (app) => {
  app.use(
    "/payments",
    authMiddleware,
    createProxyMiddleware({
      target: process.env.PAYMENT_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: {
        "^/payments": ""
      }
    })
  );
};

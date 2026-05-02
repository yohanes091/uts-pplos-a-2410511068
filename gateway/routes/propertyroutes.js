const { createProxyMiddleware } = require("http-proxy-middleware");
const authMiddleware = require("../middleware/authMiddleware");
require("dotenv").config();

module.exports = (app) => {
  app.use(
    "/properties",
    authMiddleware,
    createProxyMiddleware({
      target: process.env.PROPERTY_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: {
        "^/properties": ""
      }
    })
  );
};

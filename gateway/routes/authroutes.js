const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

module.exports = (app) => {
  app.use(
  "/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      "^/auth": "/auth"
    }
  })
);

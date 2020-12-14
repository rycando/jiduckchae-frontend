const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: '13.209.15.236:80',
            changeOrigin: true,
        })
    );
};
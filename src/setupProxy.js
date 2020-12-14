const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'ec2-13-209-15-236.ap-northeast-2.compute.amazonaws.com',
            changeOrigin: true,
        })
    );
};
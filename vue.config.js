module.exports = {
  lintOnSave: false,
  devServer: {
    //真机调试
    host: "0.0.0.0",
    //代理方式处理跨域
    proxy: {
      "/api": {
        ws: false,
        target: "http://localhost:7001/v1",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};

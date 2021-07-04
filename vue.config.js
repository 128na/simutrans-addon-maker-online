process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  configureWebpack: {
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" }
    }
  }
};

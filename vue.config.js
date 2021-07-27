process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  configureWebpack: {
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" }
    }
  },

  pwa: {
    workboxOptions: {
      skipWaiting: true,
    },
    themeColor: '#027be3',
    msTileColor: '#027be3',
    display: "standalone"
  },

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },

  transpileDependencies: [
    'quasar'
  ]
};

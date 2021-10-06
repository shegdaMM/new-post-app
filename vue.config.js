module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: [
    'quasar'
  ],
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    https: false,
    port: 8080,
    public: 'http://0.0.0.0:8080'
  },
  publicPath: '/'
};

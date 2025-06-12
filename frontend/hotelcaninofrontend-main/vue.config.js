const { defineConfig } = require('@vue/cli-service');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  outputDir: 'dist',
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public/_redirects'),
            to: path.resolve(__dirname, 'dist'),
            toType: 'dir'
          }
        ]
      })
    ]
  }
});

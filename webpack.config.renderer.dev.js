const webpack = require('webpack');
const merge = require('webpack-merge');
const { resolve } = require('path');
const baseConfig = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge.smart(baseConfig, {
  devtool: 'eval-source-map',
  // target: 'electron-renderer',
  target: 'web',
  mode: 'development',

  entry: {
    app: ['./src/client/entry.tsx'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './static/pages/index.html',
      filename: './index.html'
    })
  ],
});

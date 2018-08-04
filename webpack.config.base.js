const { resolve } = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        include: resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: 'babel-loader'
      },
    ],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.tsx', '.ts', '.json'],
  },
};

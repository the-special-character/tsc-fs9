const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'main.js',
  },
  plugins: [new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: 'index.html'
  })],
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:"babel-loader"
      }
    ]
  }
};

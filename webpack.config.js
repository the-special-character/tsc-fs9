const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'main.js',
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:"babel-loader"
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader",],
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: 'index.html'
  }),
  new MiniCssExtractPlugin()],
  // optimization: {
  //   minimizer: [
  //     new CssMinimizerPlugin(),
  //   ],
  // },
};

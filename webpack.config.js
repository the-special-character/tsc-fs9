const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "output"),
    filename: "bundle.js",
  },
  mode: devMode ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          ,
          "css-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
  ].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
  devServer: {
    open: true,
    port: 3000,
  },
};

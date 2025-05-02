const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: path.join(__dirname, "src/index.js"),
    archive: path.join(__dirname, "src/archive.js"),
    private: path.join(__dirname, "src/private.js"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      chunks: ["main"],
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      template: "./archive.html",
      filename: "archive.html",
      chunks: ["archive"],
      inject: "body",
    }),
    new HtmlWebpackPlugin({
      template: "./private.html",
      filename: "private.html",
      chunks: ["private"],
      inject: "body",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          to: ".",
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};

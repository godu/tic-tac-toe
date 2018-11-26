const path = require("path");

module.exports = {
  entry: "./src/app.tsx",

  mode: process.env.NODE_ENV || "development",

  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [{ test: /\.tsx?$/, loader: "ts-loader" }]
  },

  devServer: {
    publicPath: "/dist",
    // contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8000
  }
};

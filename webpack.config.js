const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const isProduction = process.env.NODE_ENV === "production";

const stylesHandler = "style-loader";

const config = {
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
    clean: true,
  },
  plugins: [new HtmlWebpackPlugin({ template: "index.html" })],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};

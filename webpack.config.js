const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const MODE = "development";

const enabledSourceMap = MODE === "development";

module.exports = {
  mode: MODE,
  devtool: enabledSourceMap ? "source-map" : false,
  devServer: {
    static: path.resolve(__dirname, "src"),
    open: true,
  },
  entry: "./src/scripts/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./scripts/[name]-[contenthash].js",
    // publicPath: "../",
  },
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: enabledSourceMap,
              url: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")({ grid: true })],
              },
            },
          },
          { loader: "sass-loader", options: { sourceMap: enabledSourceMap } },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name]-[contenthash][ext]",
        },
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
            },
          },
        ],
      },
      {
        test: /\.html/,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/[name]-[chunkhash].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/index.html",
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
  ],
};

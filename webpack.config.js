const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  infrastructureLogging: {
    level: "error",
  },
  stats: "errors-only",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    hot: false,
    liveReload: true,
    port: 3000,
    historyApiFallback: true,
    compress: true,
    open: false,
    client: {
      logging: "none",
      overlay: false,
      webSocketTransport: "ws",
      progress: false,
    },
    webSocketServer: "ws",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};

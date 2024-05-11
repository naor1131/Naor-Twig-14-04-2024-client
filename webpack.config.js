const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "src/index.tsx"), // an entry point for typescript called bundle.
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name][contenthash].js", // keep the names of the assets.
    clean: true,
    assetModuleFilename: "[name][ext]", // keep the names of the assets.
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "build"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to files ending in .js
        exclude: /node_modules/, // Don't apply to files residing in node_modules
        use: {
          loader: "ts-loader", // Use ts-loader for JavaScript files
        },
      },
      {
        test: /\.tsx?$/, // .ts, .tsx
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.json",
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // Inject CSS into the DOM
          "css-loader", // Translates CSS into CommonJS
          "sass-loader", // Compiles Sass to CSS
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|pdf)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "resources/", // specify the output directory
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "App",
      template: path.resolve(__dirname, "public", "index.html"),
      filename: "index.html", // output html name.
    }),

    // adding enviroment variables. accessible from process.env
    new webpack.DefinePlugin({
      "process.env.MY_ENVIRONMENT_VARIABLE": 1
    }),
  ],
};

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "index.tsx"),
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
    extensions: [".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // .ts, .tsx
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.json",
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg||jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "resources/", // specify the output directory
            },
          },
        ],
        // type: 'asset/resource',
      },
      // {
      //   test: /\.svg$/,
      //   use: ["@svgr/webpack", "url-loader"],
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Spinomenal - Home Assignment",
      template: path.resolve(__dirname, "public", "index.html"),
      filename: "index.html", // output html name.
    }),
  ],
};

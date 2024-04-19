const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
 const webpack = require('webpack');

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
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
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

    // adding enviroment variables. accessible from process.env 
    new webpack.DefinePlugin({
      'process.env.REACT_APP_MEDIATOR_WS_URL': JSON.stringify('wss://naor-twig-14-04-2024-mediator-1b8fbfd72259.herokuapp.com')
    })
  ],
};

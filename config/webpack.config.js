const __path = require("path");
const paths = require("./paths");
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: [paths.appIndexJs],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: { minimize: true }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              minimize: {
                safe: true
              }
            }
          },
          {
            loader: "postcss-loader",
            options: {
              autoprefixer: {
                browsers: ["last 2 versions"]
              },
              plugins: () => [autoprefixer]
            }
          },
          {
            loader: "sass-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true // webpack@2.x and newer
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  resolve: {
    modules: [__path.resolve(__dirname, "../"), "node_modules"],
    extensions: [".js", ".jsx", ".css", ".scss"],
    alias: {
      components: __path.join(paths.appSrc, "/components"),
      constants: __path.join(paths.appSrc, "/constants"),
      middlewares: __path.join(paths.appSrc, "/middlewares"),
      mocks: __path.join(paths.rootFolder, "/__mocks__"),
      modules: __path.join(paths.appSrc, "/modules"),
      reducers: __path.join(paths.appSrc, "/reducers"),
      services: __path.join(paths.appSrc, "/services"),
      style: __path.join(paths.appSrc, "/style"),
      utils: __path.join(paths.appSrc, "/utils")
    }
  }
};

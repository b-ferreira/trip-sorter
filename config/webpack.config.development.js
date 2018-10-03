const config = require("./webpack.config");
const merge = require("webpack-merge");

module.exports = merge(config, {
  devtool: "source-map",
  devServer: {
    historyApiFallback: true
  }
});

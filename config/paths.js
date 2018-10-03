"use strict";

const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appSrc: resolveApp("src"),
  appIndexJs: resolveApp("src/index.js"),
  rootFolder: path.resolve(__dirname, '../')
};

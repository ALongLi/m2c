/*
 * @description:
 * @Author: lal
 * @Date: 2019-12-03 11:37:46
 * @LastEditors: lal
 * @LastEditTime: 2019-12-03 11:47:49
 */
const path = require("path");
// const environment = require("./environment");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "./",
  productionSourceMap: false,
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set("@mock", resolve("mock"))
      .set("@assets", resolve("src/assets"));
    // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))
    config.module
      .rule("md")
      .test(/\.md$/)
      .use("raw-loader")
      .loader("raw-loader")
      .end();
  },

  devServer: {
    open: true
  },
  configureWebpack: config => {
    console.log(config);
  }
};

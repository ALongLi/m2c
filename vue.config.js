/*
 * @description:
 * @Author: lal
 * @Date: 2019-12-03 11:37:46
 * @LastEditors: lal
 * @LastEditTime: 2020-05-22 13:53:11
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
    config.resolve.alias.set("@mock", resolve("mock")).set("@assets", resolve("src/assets"));
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
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "mac-test",
        appId: "mac-test.desktop",
        // win: {
        //   icon: "./public/favicon.ico"
        // },
        // mac: {
        //   icon: "./public/app.png"
        // }
        publish: [
          {
            provider: "generic",
            url: "http://127.0.0.1:80/" //这里是我本地开的服务器的地址
          }
        ],
        nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          // installerIcon: "./build/icons/aaa.ico", // 安装图标
          // uninstallerIcon: "./build/icons/bbb.ico", //卸载图标
          // installerHeaderIcon: "./build/icons/aaa.ico", // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: "mac-test" // 图标名称
          // include: "build/script/installer.nsh" // 包含的自定义nsis脚本
        }
      }
    }
  }
};

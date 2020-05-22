/*
 * @description:
 * @Author: lal
 * @Date: 2019-12-03 17:13:19
 * @LastEditors: lal
 * @LastEditTime: 2020-05-22 15:48:37
 */
"use strict";

import { app, protocol, ipcMain, BrowserWindow } from "electron";
import { createProtocol, installVueDevtools } from "vue-cli-plugin-electron-builder/lib";
import path from "path";
// import fs from "fs";
const fs = require("fs-extra");

const isDevelopment = process.env.NODE_ENV !== "production";
const log = require("electron-log");
const { autoUpdater } = require("electron-updater");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";
log.info("App starting...");

const feedUrl = `http://192.168.36.45:9527/update`; // 更新包位置
if (process.env.NODE_ENV === "development") {
  autoUpdater.updateConfigPath = path.join(__dirname, "win-unpacked/resources/app-update.yml");
  // mac的地址是'Contents/Resources/app-update.yml'
}

function sendStatusToWindow(text) {
  log.info(text);
  win.webContents.send("message", text);
}

let checkForUpdates = () => {
  // 配置安装包远端服务器
  autoUpdater.setFeedURL(feedUrl);
  // 更新前，删除本地安装包 ↓
  let updaterCacheDirName = "m2c-wiki-updater";
  const updatePendingPath = path.join(
    autoUpdater.app.baseCachePath,
    updaterCacheDirName,
    "pending"
  );

  log.info(updatePendingPath);
  fs.emptyDir(updatePendingPath);

  // 下面是自动更新的整个生命周期所发生的事件
  autoUpdater.on("error", function(message) {
    sendStatusToWindow("error", message);
  });
  autoUpdater.on("checking-for-update", function(message) {
    sendStatusToWindow("checking-for-update", message);
  });
  autoUpdater.on("update-available", function(message) {
    sendStatusToWindow("update-available", message);
  });
  autoUpdater.on("update-not-available", function(message) {
    sendStatusToWindow("update-not-available", message);
  });

  // 更新下载进度事件
  autoUpdater.on("download-progress", function(progressObj) {
    log.info(parseInt(progressObj.percent));
    sendStatusToWindow("downloadProgress", progressObj);
  });
  // 更新下载完成事件
  autoUpdater.on("update-downloaded", function(
    event,
    releaseNotes,
    releaseName,
    releaseDate,
    updateUrl,
    quitAndUpdate
  ) {
    ipcMain.on("install", () => {
      autoUpdater.quitAndInstall();
    });
  });

  //执行自动更新检查
  autoUpdater.checkForUpdates();
};

// 主进程监听渲染进程传来的信息
ipcMain.on("update", () => {
  console.log("update");
  checkForUpdates();
});
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

  win.on("closed", () => {
    win = null;
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
  }
  createWindow();
});
app.on("ready", function() {
  checkForUpdates();

  autoUpdater.checkForUpdatesAndNotify();
  autoUpdater.checkForUpdates();
});
// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

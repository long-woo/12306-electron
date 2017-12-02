'use strict'

import {app, BrowserWindow, Menu, autoUpdater} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

// 菜单模版
const menusTemplate = []

// mac os
if (process.platform === 'darwin') {
  const appName = app.getName()
  const appVersion = app.getVersion()

  menusTemplate.unshift({
    label: appName,
    submenu: [{
      label: `关于${appName}`,
      role: 'about'
    }, {
      label: `当前版本${appVersion}`,
      enabled: false
    }, {
      label: '正在检查更新...',
      enabled: false,
      key: 'checkingForUpdate'
    }, {
      label: '检查更新',
      visible: false,
      key: 'checkForUpdate',
      click: () => {
        autoUpdater.checkForUpdates()
      }
    }, {
      label: '重启并安装更新',
      enabled: true,
      visible: false,
      key: 'restartToUpdate',
      click: () => {
        autoUpdater.quitAndInstall()
      }
    }, {
      type: 'separator'
    }, {
      label: `退出${appName}`,
      accelerator: 'Command+Q',
      click: () => {
        app.quit()
      }
    }]
  })
}

// windows os
if (process.platform === 'win32') {

}

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    minHeight: 600,
    useContentSize: true,
    width: process.env.NODE_ENV === 'development' ? 1000 : 888,
    minWidth: 700,
    titleBarStyle: 'hidden',
    frame: false,
    show: true,
    webPreferences: {
      webSecurity: false
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // 设置菜单
  if (!menusTemplate.length) return

  const menu = Menu.buildFromTemplate(menusTemplate)
  Menu.setApplicationMenu(menu)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

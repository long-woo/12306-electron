'use strict'

import {app, BrowserWindow, Menu, ipcMain} from 'electron'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'

log.transports.file.level = 'debug'
autoUpdater.logger = log

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

// 是否退出应用
let isQuit = false

// mac os
if (process.platform === 'darwin') {
  const appName = app.getName()
  const appVersion = app.getVersion()

  // 顶部菜单
  menusTemplate.unshift({
    label: appName,
    submenu: [{
      label: `当前版本${appVersion}`,
      enabled: false
    }, {
      label: '检查更新',
      key: 'checkForUpdate',
      click: () => {
        autoUpdater.checkForUpdatesAndNotify()
      }
    }, {
      label: '正在检查更新...',
      enabled: false,
      visible: false,
      key: 'checkingForUpdate'
    }, {
      label: '重启并安装更新',
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
    backgroundColor: '#17a2b8',
    titleBarStyle: 'hidden',
    frame: false,
    show: false,
    webPreferences: {
      webSecurity: false
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('close', event => {
    mainWindow.hide()
    if (!isQuit) {
      event.preventDefault()
    }
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // 设置菜单
  if (!menusTemplate.length) return

  const menu = Menu.buildFromTemplate(menusTemplate)
  Menu.setApplicationMenu(menu)
}

/**
 * 发送自动更新相关状态
 * @param {*} text 更新描述
 */
function sendAutoUpdateStatus (text) {
  log.info(text)
  mainWindow.webContents.send('autoUpdateStatus', text)
}

/**
 * 确保应用只有一个实例
 */
const isSecondInstance = app.makeSingleInstance((command, workingDirectory) => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

if (isSecondInstance) {
  app.quit()
  // return
}

app.on('before-quit', () => {
  isQuit = true
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
    return
  }

  mainWindow.show()
})

ipcMain.on('checkUpdate', (event, arg) => {
  if (process.env.NODE_ENV !== 'development') {
    autoUpdater.checkForUpdates()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */
autoUpdater.on('checking-for-update', () => {
  sendAutoUpdateStatus('正在检查更新...')
})

autoUpdater.on('update-available', info => {
  sendAutoUpdateStatus(`发现新版本（${info.version}）～，开始下载...`)
})

autoUpdater.on('update-not-available', info => {
  sendAutoUpdateStatus('已经是最新版本~')
})

autoUpdater.on('error', info => {
  sendAutoUpdateStatus(`更新出错：${info}`)
})

autoUpdater.on('download-progress', (progressInfo) => {
  let speed = progressInfo.bytesPerSecond
  speed = speed.toString().length > 6 ? `${parseFloat((speed / 1024 / 1024)).toFixed(2)}mb/s` : `${(speed / 1024).toFixed(2)}kb/s`
  let text = `已下载${Math.ceil(progressInfo.percent)}%（${speed}）`

  sendAutoUpdateStatus(text)
})

autoUpdater.on('update-downloaded', info => {
  sendAutoUpdateStatus('下载完成，准备安装...')
  autoUpdater.quitAndInstall()
})

app.on('ready', createWindow)

import { app, BrowserWindow } from 'electron'
import { resolve } from 'path'

import { platform } from 'os'

let window: Electron.BrowserWindow

const createWindow = () => {
  let windowData: Electron.BrowserWindowConstructorOptions = {
    frame: process.env.ENV === 'dev',
    width: 1080,
    height: 1080,
    show: false,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: resolve(__dirname, 'src/main/preload.js'),
      plugins: true
    }
  }

  window = new BrowserWindow(windowData)
  window.webContents.openDevTools({ mode: 'detach' })
  window.loadURL('https://github.com')

  window.on('closed', () => {
    window = null
  })

  window.once('ready-to-show', () => {
    window.show()
  })

  window.webContents.addListener('will-navigate', e => e.preventDefault())
}

app.on('activate', () => {
  if (window === null) {
    createWindow()
  }
})

app.on('ready', () => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (platform() !== 'darwin') {
    app.quit()
  }
})

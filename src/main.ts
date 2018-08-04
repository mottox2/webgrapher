import { app, BrowserWindow } from 'electron'
import { resolve, join } from 'path'

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
  if (true || process.env.ENV === 'dev') {
    window.webContents.openDevTools({ mode: 'detach' })
    window.loadURL('http://localhost:8090/')
  } else {
    window.loadURL(join('file://', __dirname, 'static/pages/index.html'))
  }

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

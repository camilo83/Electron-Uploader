const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');

// Después
let isDev;
import('electron-is-dev')
  .then((module) => {
    isDev = module.default;
  })
  .catch((error) => console.error('Failed to load electron-is-dev', error));

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 1000,
    title: 'Musicfy',
    // titleBarStyle: "hiddenInset",
    // resizable: false,
  });
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '/dist/index.html')}`
  );

  if (isDev) mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

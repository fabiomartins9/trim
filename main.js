const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

ipcMain.on('removeSpaces', (event, text) => {
  const result = text.replace(/[^a-zA-Z0-9]/g, ''); // Remove tudo que não é letra ou número
  event.reply('removedSpaces', result);
});

ipcMain.on('showNotification', (event, message) => {
  new Notification({
    title: 'Texto Copiado!',
    body: message,
    icon: path.join(__dirname, 'icon.png') // Substitua 'icon.png' pelo caminho do seu ícone
  }).show();
});
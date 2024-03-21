const { app, Menu, Tray, BrowserWindow, nativeImage } = require('electron');
const path = require('node:path');

let tray = null;
const isMac = process.platform === 'darwin';

function createWindow() {
  const win = new BrowserWindow({
    fullscreen: false,
    title: 'menubar',
    width: 280,
    height: 354,
    show: false,
    frame: false,
    resizable: false,
    transparent: false,
    alwaysOnTop: true,
    minimizable: false,
    vibrancy: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath('./assets/icon.png');
  tray = new Tray(icon);

  const template = [
    {
      label: 'Drag files here...',
    },
    { type: 'separator' },
    {
      label: 'Select file',
    },
    {
      label: 'Upload from clipboard',
    },
    {
      label: 'Recent uploads',
    },
    { type: 'separator' },
    {
      label: 'Quit Desktop',
      role: 'quit',
    },
  ];

  const contextMenu = Menu.buildFromTemplate(template);

  tray.setToolTip('Aplicativo de uploads...');
  tray.setContextMenu(contextMenu);
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

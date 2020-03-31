/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { strict } from 'assert';
import { stringify } from 'querystring';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 256,
    height: 256,
    webPreferences:
      process.env.NODE_ENV === 'development' || process.env.E2E_BUILD === 'true'
        ? {
            nodeIntegration: true
          }
        : {
            preload: path.join(__dirname, 'dist/renderer.prod.js')
          }
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */



app.on('ready', createWindow);



var getIPAddresses = function () {
  var os = require("os"),
  interfaces = os.networkInterfaces(),
  ipAddresses = [];

  for (var deviceName in interfaces){
      var addresses = interfaces[deviceName];

      for (var i = 0; i < addresses.length; i++) {
          var addressInfo = addresses[i];

          if (addressInfo.family === "IPv4" && !addressInfo.internal) {
              ipAddresses.push(addressInfo.address);
          }
      }
  }

  return ipAddresses;
};

// In main process.
const { ipcMain } = require('electron')
ipcMain.on('StartBridge', (event, arg) => {
  const OSC = require('osc-js')
  const config = { wsServer: {host: getIPAddresses}, udpClient: { port: arg } }
  const osc = new OSC({ plugin: new OSC.BridgePlugin(config) })
  osc.open() // start a WebSocket server on port 8080
  console.log("Done")
  event.returnValue = 'STATUS: Active - Redirecting to ' + String(arg);
})

var express    = require("express");
var morgan     = require("morgan");
var appexpress        = express();

var port = process.env.PORT || 8084;

appexpress.use(morgan("dev"));
appexpress.use(express.static(__dirname+'/web'));

appexpress.get("/", function(req, res) {
    res.sendFile('./index.html'); //index.html file of your angularjs application
});

// Start Server
appexpress.listen(port, function () {
    console.log( "Express server listening on port " + port);
});

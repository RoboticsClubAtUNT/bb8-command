/* jshint node: true */
'use strict';

const electron         = require('electron');
const app              = electron.app;
const BrowserWindow    = electron.BrowserWindow;
const emberAppLocation = `file://${__dirname}/dist/index.html`;

let mainWindow = null;

var EventEmitter = require('./services/event-emitter.js');
var Bluetooth = require('./services/bluetooth.js');
var eventEmitter = null;

var bluetooth = new Bluetooth();

electron.crashReporter.start();

app.on('window-all-closed', function onWindowAllClosed() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function onReady() {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 760
    });

    eventEmitter = new EventEmitter(mainWindow);

    eventEmitter.on('test', function(res, data) {
      console.log(data);
      eventEmitter.emit('test', JSON.stringify({
        data: {
          type: 'test',
          id: '001',
          attributes: {
            message: 'test message',
            info: data
          }
        }
      }));
    });

    eventEmitter.on('bluetooth-list', function(res, data) {
      console.log(data);
      bluetooth.list(function(data) {
        eventEmitter.emit('bluetooth-list', {
          data: {
            type: 'bluetooth-list',
            id: '001',
            attributes: {
              message: 'List of the Bluetooth ports',
              info: data
            }
          }
        });
      });
    });

    delete mainWindow.module;

    // If you want to open up dev tools programmatically, call
    mainWindow.openDevTools();

    // By default, we'll open the Ember App by directly going to the
    // file system.
    //
    // Please ensure that you have set the locationType option in the
    // config/environment.js file to 'hash'. For more information,
    // please consult the ember-electron readme.
    mainWindow.loadURL(emberAppLocation);

    // If a loading operation goes wrong, we'll send Electron back to
    // Ember App entry point
    mainWindow.webContents.on('did-fail-load', () => {
        mainWindow.loadURL(emberAppLocation);
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

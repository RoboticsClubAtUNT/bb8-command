"use strict";

const ipcMain = require('electron').ipcMain;

module.exports = class EventEmitter {
  constructor(window) {
    this._window = window;
  }

  /**
   * This will listen for a message from the Renderer process.
   * @param  {[type]}   event    [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  on(event, callback) {
    ipcMain.on(event, callback);
  }
  /**
   * This will emit a message to the Renderer process.
   * @param  {string} event [description]
   * @param  {json:string} data  [description]
   * @return {[type]}       [description]
   */
  emit(event, data) {
    var window = this._window;
    if (window) {
      window.webContents.send(event, data);
    } else {
      console.log(`ERROR: Could not send the ${event} event to the render process.`);
      console.log(`Window == ${window}`);
    }
  }
}

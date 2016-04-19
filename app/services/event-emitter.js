import Ember from 'ember';
const ipc = require('electron').ipcRenderer;

export default Ember.Service.extend({
  /**
   * This will `emit` a message to the main process.
   * http://electron.atom.io/docs/v0.37.6/api/ipc-main/
   * @param  {string} event The channel to be used for communication.
   * @param  {string} data  JSON data that has been stringified.
   * @return {[type]}       [description]
   */
  emit(event, data) {
    ipc.send(event, data);
  },

  /**
   * This will `listen` for a message from the main process.
   * http://electron.atom.io/docs/v0.37.6/api/ipc-main/
   * @param  {string}   event    The channel to be used for communication.
   * @param  {function} callback A callback function that expects a 'data' as
   *                             a paramater. (function(res, data){})(res, data);
   * @return {[type]}            [description]
   */
  once(event, callback) {
    ipc.once(event, function(res, data) {
      callback(data);
    });
  },

  on(event, callback) {
    ipc.on(event, function(res, data) {
      callback(data);
    });
  }
});

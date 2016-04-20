'use strict';

const exec = require('child_process').exec;

module.exports = class Bluetooth {
  constructor() {

  }

  list(callback) {

    if (process.platform == 'darwin') {
      var command = "ls /dev/ | grep cu";
    }

    const child = exec(command, function(err, stdout, stderr) {
      var items = stdout.split('\n');
        items.forEach(function(value) {
          console.log(value);
        });
        // console.log(`stdout: ${items}`);
        // console.log(`stderr: ${stderr}`);
        // if (!err) {
        //   console.log(`ERROR: ${err}`);
        // }
        callback(items);
    });
  }
}

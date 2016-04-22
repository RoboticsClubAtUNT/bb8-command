'use strict';

const exec = require('child_process').exec;

function cleanArray(original) {
  var newArray = new Array();
  original.forEach(function(value) {
    if (value) {
      newArray.push(value);
    }
  });
  return newArray;
}

module.exports = class Bluetooth {
  constructor() {

  }

  list(callback) {

    if (process.platform == 'darwin') {
      var command = "ls /dev/ | grep cu";
    }

    const child = exec(command, function(err, stdout, stderr) {
      var items = stdout.split('\n');
      callback(cleanArray(items));
    });
  }
}

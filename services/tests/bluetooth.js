var Bluetooth = require('../bluetooth.js');

var bluetooth = new Bluetooth();

bluetooth.list(function(data) {
  // console.log(data);
  data.forEach(function(value) {
    console.log(data);
  });
});

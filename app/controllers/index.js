import Ember from 'ember';

function jsonapify(type, id, attributes) {
  return {
    data: {
      type: type || "Unknown",
      id: id || "Unknown",
      attributes: attributes || {}
    }
  };
}



export default Ember.Controller.extend({

  eventEmitter: Ember.inject.service('event-emitter'),

  bluetoothList: [],

  actions: {
    test() {

      var eventEmitter = this.get('eventEmitter');

      var json = jsonapify('test', '001', {
        message: 'Test message'
      });

      eventEmitter.emit('test', JSON.stringify(json));
      eventEmitter.once('test', function(data) {
        alert(data);
      });

    },

    getBluetoothList() {

      var eventEmitter = this.get('eventEmitter');

      var self = this;

      var json = jsonapify('bluetooth-list-request', '001', {
        message: 'Requesting Bluetooth'
      });

      eventEmitter.emit('bluetooth-list-request', JSON.stringify(json));
      eventEmitter.once('bluetooth-list-request', function(message) {
        var json = JSON.parse(message);
        self.set('bluetoothList', json.data.attributes.info);
      });

    }
  }

});

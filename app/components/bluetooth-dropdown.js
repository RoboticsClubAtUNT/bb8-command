import Ember from 'ember';

export default Ember.Component.extend({
  eventEmitter: Ember.inject.service('event-emitter'),
  bluetoothItems: [],
  actions: {
    toggleList() {
      console.log('getting the list');
      var self = this;
      var eventEmitter = self.get('eventEmitter');
      self.set('dropdownIsShowing', !self.get('dropdownIsShowing'));
      eventEmitter.emit('bluetooth-list', {
        data: {
          type: 'request',
          id: '002',
          attributes: {
            message: 'Requesting a list of Bluetooth ports'
          }
        }
      });
      eventEmitter.once('bluetooth-list', function(data) {
        self.set('bluetoothItems', data.data.attributes.info);
      });
    },
    setBluetoothPort(port) {
      var self = this;
      self.set('bluetoothPort', port);
      self.set('dropdownIsShowing', !self.get('dropdownIsShowing'));
    }
  }
});

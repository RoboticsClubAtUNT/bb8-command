import Ember from 'ember';

function jsonapify(type, id, attributes) {
  return {
    data: {
      type: type || "Unknown",
      id: id || "Unknown",
      attributes: attributes || {}
    }
  }
}

export default Ember.Controller.extend({

  eventEmitter: Ember.inject.service('event-emitter'),

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
    }
  }

});

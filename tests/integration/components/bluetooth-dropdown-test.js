import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bluetooth-dropdown', 'Integration | Component | bluetooth dropdown', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bluetooth-dropdown}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bluetooth-dropdown}}
      template block text
    {{/bluetooth-dropdown}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

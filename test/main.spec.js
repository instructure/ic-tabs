module('main');

test('registers components on an application', function() {
  expect(4);
  var container = {
    registry: {},
    register: function(name, definition) {
      this.registry[name] = definition;
    }
  };
  var initializer = Ember.Application.initializers['ic-tabs'];
  initializer.initialize(container);
  strictEqual(container.registry['component:ic-tab'], ic.tabs.TabComponent);
  strictEqual(container.registry['component:ic-tab-list'], ic.tabs.TabListComponent);
  strictEqual(container.registry['component:ic-tab-panel'], ic.tabs.TabPanelComponent);
  strictEqual(container.registry['component:ic-tabs'], ic.tabs.TabsComponent);
});


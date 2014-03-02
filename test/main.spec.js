module('existence');

test('modules exist globally', function() {
  ok(ic.tabs.TabsComponent, 'tabs exists');
  ok(ic.tabs.TabComponent, 'tab exists');
});

test('registers components on an application', function() {
  var initializer = Ember.Application.initializers['ic-tabs'];
  ok(initializer, 'initializer exists');
});


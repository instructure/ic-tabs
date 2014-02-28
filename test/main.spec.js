module('existence');

test('module exist globally', function() {
  ok(ic.tabs.TabsComponent, 'tabs exists');
  ok(ic.tabs.TabComponent, 'tab exists');
});


moduleForComponent('ic-tab', {
  needs: ['component:ic-tabs']
});

test('tagName', function() {
  var tabs = this.subject();
  equal(tabs.get('tagName'), 'ic-tab');
  ok(true);
});

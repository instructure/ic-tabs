moduleForComponent('ic-tabs', 'TabsComponent', {
  needs: [
    'component:ic-tab',
    'component:ic-tab-panel',
    'component:ic-tab-list'
  ]
});

test('selects first tab and shows the panel', function() {
  expect(3);
  var component = buildComponent(this);
  var tab1 = lookupComponent('tab1');
  var panel1 = lookupComponent('panel1');
  ok(component.get('activeTab') === tab1);
  ok(tab1.get('active'));
  var el = tab1.$();
  ok(panel1.$().is(':visible'));
});

test('selects tab at selected-index', function() {
  expect(2);
  var component = buildComponent(this, {
    'selected-index': 1,
  });
  var tab2 = lookupComponent('tab2');
  ok(component.get('activeTab') === tab2);
  ok(tab2.get('active'));
});

test('selected element attributes', function() {
  expect(6);
  var component = buildComponent(this);
  var tab = lookupComponent('tab1').$();
  var panel = lookupComponent('panel1').$();
  equal(tab.attr('selected'), 'selected');
  equal(tab.attr('aria-selected'), 'true');
  equal(tab.attr('aria-expanded'), 'true');
  equal(tab.attr('aria-controls'), 'panel1');
  equal(tab.attr('tabindex'), '0');
  equal(panel.attr('aria-labeledby'), 'tab1');
});

test('not selected element attributes', function() {
  expect(4);
  var component = buildComponent(this);
  var tab = lookupComponent('tab2').$();
  var panel = lookupComponent('panel2').$();
  equal(tab.attr('selected'), null);
  equal(tab.attr('aria-selected'), 'false');
  equal(tab.attr('aria-expanded'), 'false');
  equal(tab.attr('tabindex'), null);
});

test('selects tab on click', function() {
  expect(3);
  var component = buildComponent(this);
  var tab1 = lookupComponent('tab1');
  var tab2 = lookupComponent('tab2');
  ok(component.get('activeTab') === tab1);
  tab2.$().simulate('click');
  ok(component.get('activeTab') === tab2);
  ok(tab2.$()[0] != document.activeElement, 'does not focus with mouse');
});

test('keyboard navigation', function() {
  expect(5);
  var component = buildComponent(this);
  var tab1 = lookupComponent('tab1');
  var tab2 = lookupComponent('tab2');

  tab1.$().simulate('keydown', {keyCode: 39});
  ok(component.get('activeTab') === tab2, 'right arrow');

  tab2.$().simulate('keydown', {keyCode: 37});
  ok(component.get('activeTab') === tab1, 'left arrow');

  tab1.$().simulate('keydown', {keyCode: 40});
  ok(component.get('activeTab') === tab2, 'down arrow');

  tab2.$().simulate('keydown', {keyCode: 38});
  ok(component.get('activeTab') === tab1, 'up arrow');

  ok(tab1.$()[0] == document.activeElement, 'focuses with keyboard');
});


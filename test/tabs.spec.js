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
  var tab1 = Ember.View.views['tab1'];
  var panel1 = Ember.View.views['panel1'];
  equal(component.get('activeTab'), tab1);
  ok(tab1.get('active'));
  var el = tab1.$();
  ok(panel1.$().is(':visible'));
});

test('selects tab at selected-index', function() {
  expect(2);
  var component = buildComponent(this, {
    'selected-index': 1,
  });
  var tab2 = Ember.View.views['tab2'];
  equal(component.get('activeTab'), tab2);
  ok(tab2.get('active'));
});

test('element attributes', function() {
  expect(10);
  var component = buildComponent(this);
  var tab = Ember.View.views['tab1'].$();
  var panel = Ember.View.views['panel1'].$();
  equal(tab.attr('selected'), 'selected');
  equal(tab.attr('aria-selected'), 'true');
  equal(tab.attr('aria-expanded'), 'true');
  equal(tab.attr('aria-controls'), 'panel1');
  equal(tab.attr('tabindex'), '0');
  equal(panel.attr('aria-labeledby'), 'tab1');
  component.select(Ember.View.views['tab2']);
  Ember.run.schedule('afterRender', null, function() {
    equal(tab.attr('selected'), null);
    equal(tab.attr('aria-selected'), 'false');
    equal(tab.attr('aria-expanded'), 'false');
    equal(tab.attr('tabindex'), null);
  });
});

test('selects tab on click', function() {
  expect(3);
  var component = buildComponent(this);
  var tab1 = Ember.View.views['tab1'];
  var tab2 = Ember.View.views['tab2'];
  equal(component.get('activeTab'), tab1);
  tab2.$().simulate('click');
  equal(component.get('activeTab'), tab2);
  ok(tab2.$()[0] != document.activeElement, 'does not focus with mouse');
});

test('keyboard navigation', function() {
  //expect(2);
  var component = buildComponent(this);
  var tab1 = Ember.View.views['tab1'];
  var tab2 = Ember.View.views['tab2'];

  tab1.$().simulate('keydown', {keyCode: 39});
  equal(component.get('activeTab'), tab2, 'right arrow');

  tab2.$().simulate('keydown', {keyCode: 37});
  equal(component.get('activeTab'), tab1, 'left arrow');

  tab1.$().simulate('keydown', {keyCode: 40});
  equal(component.get('activeTab'), tab2, 'down arrow');

  tab2.$().simulate('keydown', {keyCode: 38});
  equal(component.get('activeTab'), tab1, 'up arrow');

  ok(tab1.$()[0] == document.activeElement, 'focuses with keyboard');
});

function buildComponent(test, props) {
  props = props || {};
  var component = test.subject(Ember.merge({
    template: function(){/*
      {{#ic-tab-list}}
        {{#ic-tab id="tab1"}}tab1{{/ic-tab}}
        {{#ic-tab id="tab2"}}tab2{{/ic-tab}}
        {{#ic-tab id="tab3"}}tab3{{/ic-tab}}
      {{/ic-tab-list}}
      {{#ic-tab-panel id="panel1"}}one{{/ic-tab-panel}}
      {{#ic-tab-panel id="panel2"}}two{{/ic-tab-panel}}
      {{#ic-tab-panel id="panel3"}}three{{/ic-tab-panel}}
    */}.compile()
  }, props));
  test.append();
  return component;
}



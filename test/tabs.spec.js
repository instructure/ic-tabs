moduleForComponent('ic-tabs', 'TabsComponent', {
  needs: [
    'component:ic-tab',
    'component:ic-tab-panel',
    'component:ic-tab-list'
  ]
});

test('sets first tab found to active', function() {
  expect(2);
  var component = this.subject({
    template: function(){/*
      {{#ic-tab-list}}
        {{ic-tab id="tab1"}}
        {{ic-tab id="tab2"}}
      {{/ic-tab-list}}
      {{#ic-tab-panel}}one{{/ic-tab-panel}}
      {{#ic-tab-panel}}two{{/ic-tab-panel}}
    */}.compile()
  });
  this.append();
  var tab1 = Ember.View.views['tab1'];
  equal(component.get('activeTab'), tab1);
  ok(tab1.get('active'));
});


//test('tagName', function() {
  //expect(1);
  //var tabs = this.subject();
  //equal(tabs.get('tagName'), 'ic-tabs');
//});

//test('activate', function() {
  //expect(1);
  //var tabs = this.subject();
  //var o = {};
  //tabs.activate(o);
  //strictEqual(tabs.get('activeTab'), o);
//});

//test('sets last to declare active as active tab', function() {
  //expect(2);
  //var component = this.subject({
    //template: [
      //'{{ic-tab id="tab1"}}',
      //'{{ic-tab id="tab2" active=true}}'
    //].compile()
  //});
  //equal(component.get('activeTab'), null);
  //this.append();
  //var tab2 = Ember.View.views['tab2'];
  //equal(component.get('activeTab'), tab2);
//});

//test('sets active tab on click', function() {
  //expect(2);
  //var component = this.subject({
    //template: [
      //'{{#ic-tab id="tab1"}}OHAI{{/ic-tab}}',
      //'{{#ic-tab id="tab2" active=true}}Hello{{/ic-tab}}'
    //].compile()
  //});
  //this.append();
  //var tab1 = Ember.View.views['tab1'];
  //var tab2 = Ember.View.views['tab2'];
  //equal(component.get('activeTab'), tab2);
  //$('#tab1').simulate('click');
  //equal(component.get('activeTab'), tab1);
//});

//test('sets is-active className to the correct tab', function() {
  //expect(4);
  //noCleanup = true;
  //var component = this.subject({
    //template: [
      //'{{#ic-tab id="tab1"}}OHAI{{/ic-tab}}',
      //'{{#ic-tab id="tab2" active=true}}Hello{{/ic-tab}}'
    //].compile()
  //});
  //this.append();
  //var tab1 = Ember.View.views['tab1'];
  //var tab2 = Ember.View.views['tab2'];
  //ok(tab2.$().attr('class').match('is-active'));
  //ok(!tab1.$().attr('class').match('is-active'));
  //$('#tab1').simulate('click');
  //ok(tab1.$().attr('class').match('is-active'));
  //ok(!tab2.$().attr('class').match('is-active'));
//});


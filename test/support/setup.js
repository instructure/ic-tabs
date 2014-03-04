emq.globalize();

setResolver(Ember.DefaultResolver.extend({
  testSubjects: {
    'component:ic-tab': ic.tabs.TabComponent,
    'component:ic-tab-list': ic.tabs.TabListComponent,
    'component:ic-tab-panel': ic.tabs.TabPanelComponent,
    'component:ic-tabs': ic.tabs.TabsComponent
  },
  resolve: function(fullName) {
    return this.testSubjects[fullName] || this._super.apply(this, arguments);
  }
}).create());

Function.prototype.compile = function() {
  var template = this.toString().split('\n').slice(1,-1).join('\n') + '\n';
  return Ember.Handlebars.compile(template);
}

function lookupComponent(id) {
  return Ember.View.views[id];
}

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


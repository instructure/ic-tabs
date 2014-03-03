String.prototype.compile = function() {
  return Ember.Handlebars.compile(this);
};

Array.prototype.compile = function() {
  return Ember.Handlebars.compile(this.join('\n'));
};

Function.prototype.compile = function() {
  var template = this.toString().split('\n').slice(1,-1).join('\n') + '\n';
  return Ember.Handlebars.compile(template);
}

function lookupComponent(id) {
  return Ember.View.views[id];
}

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


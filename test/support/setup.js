String.prototype.compile = function() {
  return Ember.Handlebars.compile(this);
};

Array.prototype.compile = function() {
  return Ember.Handlebars.compile(this.join('\n'));
};

function lookupComponent(id) {
  return Ember.View.views[id];
}

emq.globalize();

setResolver(Ember.DefaultResolver.extend({
  testSubjects: {
    'component:ic-tab': ic.tabs.TabComponent,
    'component:ic-tabs': ic.tabs.TabsComponent
  },
  resolve: function(fullName) {
    return this.testSubjects[fullName] || this._super.apply(this, arguments);
  }
}).create());


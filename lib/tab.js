import { Component, computed } from 'ember';

export default Component.extend({

  tagName: 'ic-tab',

  role: 'tab',

  classNameBindings: ['active'],

  active: function(key, val) {
    if (arguments.length > 1) {
      if (val === true) {
        Ember.run.schedule('afterRender', this, 'activate');
        return true;
      }
    }
    return this.get('parentView.parentView.activeTab') === this;
  }.property('parentView.parentView.activeTab'),

  activate: function() {
    this.get('parentView.parentView').activate(this);
  }.on('click'),

  activateIfFirstOrActive: function() {
    if (this.get('active') || !this.get('parentView.parentView.activeTab')) this.activate();
  }.on('didInsertElement'),

  registerWithTabList: function() {
    this.get('parentView').registerTab(this);
  }.on('didInsertElement')

});


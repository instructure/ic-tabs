import { Component, computed } from 'ember';

export default Component.extend({

  tagName: 'ic-tab',

  classNameBindings: ['isActive'],

  // set attribute in template to make the tab active
  active: false,

  activeTab: Ember.computed.alias('parentView.activeTab'),

  isActive: function() {
    return this.get('activeTab') === this;
  }.property('activeTab'),

  activate: function() {
    this.get('parentView').activate(this);
  }.on('click'),

  activateIfFirstOrActive: function() {
    if (this.get('active') || !this.get('activeTab')) this.activate();
  }.on('didInsertElement')

});


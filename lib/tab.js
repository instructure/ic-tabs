import { Component, computed } from 'ember';

export default Component.extend({

  tagName: 'ic-tab',

  role: 'tab',

  classNameBindings: ['isActive'],

  // set attribute in template to make the tab active
  active: false,

  tabList: computed.alias('parentView'),

  tabs: computed.alias('parentView.parentView'),

  activeTab: computed.alias('parentView.parentView.activeTab'),

  isActive: function() {
    return this.get('activeTab') === this;
  }.property('activeTab'),

  activate: function() {
    this.get('tabs').activate(this);
  }.on('click'),

  activateIfFirstOrActive: function() {
    if (this.get('active') || !this.get('activeTab')) this.activate();
  }.on('didInsertElement'),

  registerWithTabList: function() {
    this.get('tabList').registerTab(this);
  }.on('didInsertElement')

});


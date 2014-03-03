import { Component, computed } from 'ember';

export default Component.extend({

  tagName: 'ic-tab',

  role: 'tab',

  classNameBindings: ['active'],

  tabs: computed.alias('parentView.parentView'),

  tabList: computed.alias('parentView'),

  active: function(key, val) {
    if (val === true) return true;
    return this.get('tabs.activeTab') === this;
  }.property('tabs.activeTab'),

  activate: function() {
    this.get('tabs').activate(this);
  }.on('click'),

  activateIfFirstOrActive: function() {
    if (this.get('active') || !this.get('tabs.activeTab')) this.activate();
  }.on('didInsertElement'),

  registerWithTabList: function() {
    this.get('tabList').registerTab(this);
  }.on('didInsertElement')

});


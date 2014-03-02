import { Component, computed } from 'ember';

export default Component.extend({

  tagName: 'ic-tab-panel',

  role: 'tabpanel',

  classNameBindings: ['isActive'],

  'ic-tabs': computed.alias('parentView'),

  tab: function() {
    var index = this.get('ic-tabs.tabPanels').indexOf(this);
    var tabs = this.get('ic-tabs.tabList.tabs');
    return tabs && tabs.objectAt(index);
  }.property('ic-tabs.tabList.tabs.@each'),

  isActive: function() {
    return this.get('tab.isActive');
  }.property('tab.isActive'),

  registerWithTabs: function() {
    this.get('ic-tabs').registerTabPanel(this);
  }.on('didInsertElement'),

});


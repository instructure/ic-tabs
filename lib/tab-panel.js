import { Component, computed } from 'ember';

export default Component.extend({

  tagName: 'ic-tab-panel',

  role: 'tabpanel',

  classNameBindings: ['active'],

  'ic-tabs': computed.alias('parentView'),

  tab: function() {
    var index = this.get('ic-tabs.tabPanels').indexOf(this);
    var tabs = this.get('ic-tabs.tabList.tabs');
    return tabs && tabs.objectAt(index);
  }.property('ic-tabs.tabList.tabs.@each'),

  active: function() {
    return this.get('tab.active');
  }.property('tab.active'),

  registerWithTabs: function() {
    this.get('ic-tabs').registerTabPanel(this);
  }.on('didInsertElement'),

  toggleVisibility: function() {
    if (this.get('active')) {
      this.$().css('display', '');
    } else {
      this.$().css('display', 'none');
    }
  }.observes('active')

});


import { Component, computed } from 'ember';

export default Component.extend({

  tagName: 'ic-tab-panel',

  role: 'tabpanel',

  classNameBindings: ['active'],

  tab: function() {
    var index = this.get('parentView.tabPanels').indexOf(this);
    var tabs = this.get('parentView.tabList.tabs');
    return tabs && tabs.objectAt(index);
  }.property('parentView.tabList.tabs.@each'),

  active: function() {
    return this.get('tab.active');
  }.property('tab.active'),

  registerWithTabs: function() {
    this.get('parentView').registerTabPanel(this);
  }.on('didInsertElement'),

  toggleVisibility: function() {
    if (this.get('active')) {
      this.$().css('display', '');
    } else {
      this.$().css('display', 'none');
    }
  }.observes('active')

});


import { Component, computed } from 'ember';

export default Component.extend({

  tagName: 'ic-tab-panel',

  attributeBindings: [
    'role',
    'aria-expanded',
    'aria-labeledby',
    'aria-hidden'
  ],

  role: 'tabpanel',

  classNameBindings: ['active'],

  tabList: computed.alias('parentView.tabList'),

  tabPanels: computed.alias('parentView.tabPanels'),

  'aria-expanded': computed.alias('tab.aria-selected'),

  'aria-labeledby': computed.alias('tab.elementId'),

  'aria-hidden': function() {
    return !this.get('active')+'';
  }.property('active'),

  tab: function() {
    var index = this.get('tabPanels').indexOf(this);
    var tabs = this.get('tabList.tabs');
    return tabs && tabs.objectAt(index);
  }.property('tabList.tabs.@each'),

  active: function() {
    return this.get('tab.active');
  }.property('tab.active'),

  toggleVisibility: function() {
    var display = this.get('active') ? '' : 'none';
    this.$().css('display', display);
  }.observes('active'),

  registerWithTabs: function() {
    this.get('parentView').registerTabPanel(this);
  }.on('didInsertElement')

});


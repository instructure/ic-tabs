import { Component, ArrayProxy, computed } from 'ember';

export default Component.extend({

  tagName: 'ic-tab-list',

  role: 'tablist',

  attributeBindings: ['aria-multiselectable'],

  'aria-multiselectable': false,

  activeTab: computed.alias('parentView.activeTab'),

  registerWithTabs: function() {
    this.get('parentView').registerTabList(this);
  }.on('didInsertElement'),

  tabs: null,

  createTabs: function() {
    this.set('tabs', ArrayProxy.create({content: []}));
  }.on('init'),

  registerTab: function(tab) {
    this.get('tabs').addObject(tab);
  },

  navigateOnKeyDown: function(event) {
    var key = event.keyCode;
    if (key == 37 /*<*/ || key == 38 /*^*/) { this.selectNext(); }
    if (key == 39 /*>*/ || key == 40 /*v*/) { this.selectPrevious(); }
  }.on('keyDown'),

  activeTabIndex: function() {
    return this.get('tabs').indexOf(this.get('activeTab'));
  }.property('activeTab'),

  selectNext: function() {
    var index = this.get('activeTabIndex') + 1;
    if (index == this.get('tabs.length')) { index = 0; }
    this.selectTabAtIndex(index);
  },

  selectPrevious: function() {
    var index = this.get('activeTabIndex') - 1;
    if (index == -1) { index = this.get('tabs.length') - 1; }
    this.selectTabAtIndex(index);
  },

  selectTabAtIndex: function(index) {
    var tab = this.get('tabs').objectAt(index);
    tab.activate();
    tab.$().focus();
  }

});


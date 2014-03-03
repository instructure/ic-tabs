import { Component, ArrayProxy, computed } from 'ember';

export default Component.extend({

  tagName: 'ic-tabs',

  activeTab: null,

  tabPanels: null,

  'active-index': 0,

  // comes from queryParams, need to validate
  validateActiveIndex: function() {
    // wait for everything to render so the panels length is correct
    Ember.run.schedule('afterRender', this, function() {
      var length = this.get('tabList.tabs.length');
      var index = parseInt(this.get('active-index'), 10);
      if (isNaN(index) || index < 0 || index >= length) {
        this.set('active-index', 0);
      }
    });
  }.on('didInsertElement'),

  createTabPanels: function(tabList) {
    this.set('tabPanels', ArrayProxy.create({content: []}));
  }.on('init'),

  activate: function(tab) {
    this.set('activeTab', tab);
    this.set('active-index', tab.get('index'));
  },

  registerTabList: function(tabList) {
    this.set('tabList', tabList);
  },

  registerTabPanel: function(tabPanel) {
    this.get('tabPanels').addObject(tabPanel);
  }

});


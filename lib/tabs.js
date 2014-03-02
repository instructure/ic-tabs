import { Component, ArrayProxy } from 'ember';

export default Component.extend({

  tagName: 'ic-tabs',

  activeTab: null,

  activate: function(tab) {
    this.set('activeTab', tab);
  },

  registerTabList: function(tabList) {
    this.set('tabList', tabList);
  },

  setTabPanels: function(tabList) {
    this.set('tabPanels', ArrayProxy.create({content: []}));
  }.on('init'),

  registerTabPanel: function(tabPanel) {
    this.get('tabPanels').addObject(tabPanel);
  }

});


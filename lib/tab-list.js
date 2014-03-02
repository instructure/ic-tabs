import { Component, ArrayProxy, computed } from 'ember';

export default Component.extend({

  tagName: 'ic-tab-list',

  role: 'tablist',

  registerWithTabs: function() {
    this.get('parentView').registerTabList(this);
  }.on('didInsertElement'),

  tabs: null,

  setTabs: function() {
    this.set('tabs', ArrayProxy.create({content: []}));
  }.on('init'),

  registerTab: function(tab) {
    this.get('tabs').addObject(tab);
  }

});


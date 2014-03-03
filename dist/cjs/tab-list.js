"use strict";
var Component = require("ember").Component;
var ArrayProxy = require("ember").ArrayProxy;
var computed = require("ember").computed;

exports["default"] = Component.extend({

  tagName: 'ic-tab-list',

  attributeBindings: [
    'role',
    'aria-multiselectable'
  ],

  role: 'tablist',

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
    // TODO: keystroke to return to tablist from tab?
    var key = event.keyCode;
    if (key == 37 /*<*/ || key == 38 /*^*/) {
      this.selectPrevious();
    } else if (key == 39 /*>*/ || key == 40 /*v*/) {
      this.selectNext();
    } else {
      return;
    }
    event.preventDefault();
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
    tab.select({focus: true});
  }

});
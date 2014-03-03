!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),(f.ic||(f.ic={})).tabs=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
/*
 * http://www.w3.org/TR/wai-aria/roles#tab
 * http://www.w3.org/TR/wai-aria/roles#tablist
 * http://www.w3.org/TR/wai-aria/roles#tabpanel
 */

var TabComponent = _dereq_("./tab")["default"] || _dereq_("./tab");
var TabListComponent = _dereq_("./tab-list")["default"] || _dereq_("./tab-list");
var TabPanelComponent = _dereq_("./tab-panel")["default"] || _dereq_("./tab-panel");
var TabsComponent = _dereq_("./tabs")["default"] || _dereq_("./tabs");
var Application = window.Ember.Application;

Application.initializer({
  name: 'ic-tabs',
  initialize: function(container) {
    container.register('component:ic-tab',       TabComponent);
    container.register('component:ic-tab-list',  TabListComponent);
    container.register('component:ic-tab-panel', TabPanelComponent);
    container.register('component:ic-tabs',      TabsComponent);
  }
});

exports.TabComponent = TabComponent;
exports.TabListComponent = TabListComponent;
exports.TabPanelComponent = TabPanelComponent;
exports.TabsComponent = TabsComponent;
},{"./tab":4,"./tab-list":2,"./tab-panel":3,"./tabs":5}],2:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var ArrayProxy = window.Ember.ArrayProxy;
var computed = window.Ember.computed;

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
},{}],3:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var computed = window.Ember.computed;

exports["default"] = Component.extend({

  tagName: 'ic-tab-panel',

  attributeBindings: [
    'role',
    'aria-labeledby'
  ],

  role: 'tabpanel',

  classNameBindings: ['active'],

  tabList: computed.alias('parentView.tabList'),

  tabPanels: computed.alias('parentView.tabPanels'),

  'aria-labeledby': computed.alias('tab.elementId'),

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
},{}],4:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var computed = window.Ember.computed;

var alias = computed.alias;

exports["default"] = Component.extend({

  tagName: 'ic-tab',

  attributeBindings: [
    'role',
    'aria-controls',
    'aria-selected',
    'aria-expanded',
    'tabindex',
    'selected'
  ],

  selected: function() {
    return this.get('active') ? 'selected' : null;
  }.property('active'),

  role: 'tab',

  tabindex: function() {
    return this.get('active') ? 0 : null;
  }.property('active'),

  tabs: alias('parentView.parentView'),

  tabList: alias('parentView'),

  'aria-controls': alias('tabPanel.elementId'),

  'aria-selected': function() {
    // coerce to ensure a "true" or "false" attribute value
    return this.get('active')+'';
  }.property('active'),

  'aria-expanded': alias('aria-selected'),

  active: function(key, val) {
    return this.get('tabs.activeTab') === this;
  }.property('tabs.activeTab'),

  select: function(opts) {
    this.get('tabs').select(this);
    if (opts && opts.focus) {
      Ember.run.schedule('afterRender', this, function() {
        this.$().focus();
      });
    }
  }.on('click'),

  index: function() {
    return this.get('tabList.tabs').indexOf(this);
  }.property('tabList.tabs.@each'),

  tabPanel: function() {
    var index = this.get('index');
    var panels = this.get('tabs.tabPanels');
    return panels && panels.objectAt(index);
  }.property('tabs.tabPanels.@each'),

  selectFromTabsSelectedIndex: function() {
    var activeTab = this.get('tabs.activeTab');
    if (activeTab === this) return; // this was just selected
    var index = parseInt(this.get('tabs.selected-index'), 10);
    var myIndex = this.get('index');
    if (index === myIndex) {
      this.select();
    }
  }.observes('tabs.selected-index').on('didInsertElement'),

  registerWithTabList: function() {
    this.get('tabList').registerTab(this);
  }.on('didInsertElement')

});
},{}],5:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var ArrayProxy = window.Ember.ArrayProxy;
var computed = window.Ember.computed;

exports["default"] = Component.extend({

  tagName: 'ic-tabs',

  activeTab: null,

  tabPanels: null,

  'selected-index': 0,

  // comes from queryParams, need to validate
  validateSelected: function() {
    // wait for everything to render so the panels length is correct
    Ember.run.schedule('afterRender', this, function() {
      var length = this.get('tabList.tabs.length');
      var index = parseInt(this.get('selected-index'), 10);
      if (isNaN(index) || index < 0 || index >= length) {
        this.set('selected-index', 0);
      }
    });
  }.on('didInsertElement'),

  createTabPanels: function(tabList) {
    this.set('tabPanels', ArrayProxy.create({content: []}));
  }.on('init'),

  select: function(tab) {
    this.set('activeTab', tab);
    this.set('selected-index', tab.get('index'));
  },

  registerTabList: function(tabList) {
    this.set('tabList', tabList);
  },

  registerTabPanel: function(tabPanel) {
    this.get('tabPanels').addObject(tabPanel);
  }

});
},{}]},{},[1])
(1)
});
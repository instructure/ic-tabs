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

  /**
   * See http://www.w3.org/TR/wai-aria/roles#tablist
   *
   * @property role
   * @type String
   */

  role: 'tablist',

  /**
   * Tells screenreaders that only one tab can be selected at a time.
   *
   * @property 'aria-multiselectable'
   * @private
   */

  'aria-multiselectable': false,

  /**
   * The currently selected tab.
   *
   * @property activeTab
   */

  activeTab: computed.alias('parentView.activeTab'),

  /**
   * Regsiters itself with the ic-tab component.
   *
   * @method registerWithTabs
   * @private
   */

  registerWithTabs: function() {
    this.get('parentView').registerTabList(this);
  }.on('didInsertElement'),

  /**
   * Storage for all tab components, facilitating keyboard navigation.
   *
   * @property tabs
   * @type ArrayProxy
   */

  tabs: null,

  /**
   * Creates the tabs ArrayProxy on init (otherwise would be shared by every
   * instance)
   *
   * @private
   */

  createTabs: function() {
    this.set('tabs', ArrayProxy.create({content: []}));
  }.on('init'),

  /**
   * Adds a tab to the tabs ArrayProxy.
   *
   * @method registerTab
   * @private
   */

  registerTab: function(tab) {
    this.get('tabs').addObject(tab);
  },

  unregisterTab: function(tab) {
    this.get('tabs').removeObject(tab);
  },

  /**
   * Sets up keyboard navigation.
   *
   * @method navigateOnKeyDown
   * @private
   */

  navigateOnKeyDown: function(event) {
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

  /**
   * Tracks the index of the active tab so we can select previous/next.
   *
   * @property activeTabIndex
   * @type Number
   */

  activeTabIndex: function() {
    return this.get('tabs').indexOf(this.get('activeTab'));
  }.property('activeTab'),

  /**
   * Selects the next tab in the list, or loops to the beginning.
   *
   * @method selectNext
   * @private
   */

  selectNext: function() {
    var index = this.get('activeTabIndex') + 1;
    if (index == this.get('tabs.length')) { index = 0; }
    this.selectTabAtIndex(index);
  },

  /**
   * Selects the previous tab in the list, or loops to the end.
   *
   * @method selectPrevious
   * @private
   */

  selectPrevious: function() {
    var index = this.get('activeTabIndex') - 1;
    if (index == -1) { index = this.get('tabs.length') - 1; }
    this.selectTabAtIndex(index);
  },

  /**
   * Selects a tab at an index.
   *
   * @method selectTabAtIndex
   * @private
   */

  selectTabAtIndex: function(index) {
    var tab = this.get('tabs').objectAt(index);
    tab.select({focus: true});
  }

});
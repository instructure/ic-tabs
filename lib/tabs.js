import { Component, ArrayProxy, computed } from 'ember';

export default Component.extend({

  tagName: 'ic-tabs',

  /**
   * The selected TabComponent instance.
   *
   * @property activeTab
   * @type TabComponent
   */

  activeTab: null,

  /**
   * The TabPanelComponent instances.
   *
   * @property tabPanels
   * @type ArrayProxy
   */

  tabPanels: null,

  /**
   * Set this to the tab you'd like to be initially active. Usually it is
   * bound to a controller property that is used as a query parameter.
   *
   * @property 'selected-index'
   * @type Number
   */

  'selected-index': 0,

  /**
   * Validates the selected-index, if its not valid just sets to 0. This is
   * important mostly for the query-params use-case since it can be end-user
   * supplied.
   *
   * @method validateSelected
   * @private
   */

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

  /**
   * Creates the `tabPanels` ArrayProxy.
   *
   * @method createTabPanels
   * @private
   */

  createTabPanels: function(tabList) {
    this.set('tabPanels', ArrayProxy.create({content: []}));
  }.on('init'),

  /**
   * Selects a tab.
   *
   * @method select
   */

  select: function(tab) {
    this.set('activeTab', tab);
    this.set('selected-index', tab.get('index'));
  },

  /**
   * Registers the TabListComponent instance.
   *
   * @method registerTabList
   * @private
   */

  registerTabList: function(tabList) {
    this.set('tabList', tabList);
  },

  /**
   * Registers TabPanelComponent instances so related components can access
   * them.
   *
   * @method registerTabPanel
   * @private
   */

  registerTabPanel: function(tabPanel) {
    this.get('tabPanels').addObject(tabPanel);
  }

});


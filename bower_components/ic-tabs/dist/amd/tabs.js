define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var ArrayProxy = __dependency1__.ArrayProxy;
    var computed = __dependency1__.computed;

    __exports__["default"] = Component.extend({

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
       * Validates the selected-index, if its not valid tries to pick the closest
       * valid index.  This is important mostly for the query-params use-case since
       * it can be end-user supplied, but also observes the tabPanels so when the
       * active panel is destroyed we intelligently pick a new tab.
       *
       * @method validateSelected
       * @private
       */

      validateSelected: function() {
        var length = this.get('tabList.tabs.length');
        if (length === 0) return;
        var index = parseInt(this.get('selected-index'), 10);
        if (isNaN(index) || index < 0) this.set('selected-index', 0);
        if (index >= length) this.set('selected-index', length - 1);
      }.observes('tabPanels.@each'),

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
      },

      unregisterTabPanel: function(tabPanel) {
        this.get('tabPanels').removeObject(tabPanel);
      }

    });
  });
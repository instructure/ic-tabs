define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var ArrayProxy = __dependency1__.ArrayProxy;
    var computed = __dependency1__.computed;

    __exports__["default"] = Component.extend({

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
  });
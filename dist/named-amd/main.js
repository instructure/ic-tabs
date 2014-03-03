define("ic-tabs",
  ["./tab","./tab-list","./tab-panel","./tabs","ember","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    "use strict";
    /*
     * http://www.w3.org/TR/wai-aria/roles#tab
     * http://www.w3.org/TR/wai-aria/roles#tablist
     * http://www.w3.org/TR/wai-aria/roles#tabpanel
     */

    var TabComponent = __dependency1__["default"] || __dependency1__;
    var TabListComponent = __dependency2__["default"] || __dependency2__;
    var TabPanelComponent = __dependency3__["default"] || __dependency3__;
    var TabsComponent = __dependency4__["default"] || __dependency4__;
    var Application = __dependency5__.Application;

    Application.initializer({
      name: 'ic-tabs',
      initialize: function(container) {
        container.register('component:ic-tab',       TabComponent);
        container.register('component:ic-tab-list',  TabListComponent);
        container.register('component:ic-tab-panel', TabPanelComponent);
        container.register('component:ic-tabs',      TabsComponent);
      }
    });

    __exports__.TabComponent = TabComponent;
    __exports__.TabListComponent = TabListComponent;
    __exports__.TabPanelComponent = TabPanelComponent;
    __exports__.TabsComponent = TabsComponent;
  });define("ic-tabs/tab-list",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var ArrayProxy = __dependency1__.ArrayProxy;
    var computed = __dependency1__.computed;

    __exports__["default"] = Component.extend({

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
  });define("ic-tabs/tab-panel",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var computed = __dependency1__.computed;

    __exports__["default"] = Component.extend({

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
  });define("ic-tabs/tab",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var computed = __dependency1__.computed;

    var alias = computed.alias;

    __exports__["default"] = Component.extend({

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
  });define("ic-tabs/tabs",
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
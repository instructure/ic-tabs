define("ic-tabs",
  ["./tab","./tab-list","./tab-panel","./tabs","ember","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    "use strict";
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

      // TODO: remove this, toggleVisibility won't fire w/o it though (?)
      classNameBindings: ['active'],

      /**
       * See http://www.w3.org/TR/wai-aria/roles#tabpanel
       *
       * @property role
       * @type String
       * @private
       */

      role: 'tabpanel',

      /**
       * Reference to the TabListComponent instance, used so we can find the
       * associated tab.
       *
       * @property tabList
       * @type TabListComponent
       * @private
       */

      tabList: computed.alias('parentView.tabList'),

      /**
       * Reference to the ArrayProxy of TabPanelComponent instances.
       *
       * @property tabPanels
       * @type ArrayProxy
       * @private
       */

      tabPanels: computed.alias('parentView.tabPanels'),

      /**
       * Tells screenreaders which tab labels this panel.
       *
       * @property 'aria-labeledby'
       * @type String
       * @private
       */

      'aria-labeledby': computed.alias('tab.elementId'),

      /**
       * Reference to this panel's associated tab.
       *
       * @property tab
       * @type TabComponent
       */

      tab: function() {
        var index = this.get('tabPanels').indexOf(this);
        var tabs = this.get('tabList.tabs');
        return tabs && tabs.objectAt(index);
      }.property('tabList.tabs.@each'),

      /**
       * Tells whether or not this panel is active.
       *
       * @property active
       * @type Boolean
       */

      active: function() {
        return this.get('tab.active');
      }.property('tab.active'),

      /**
       * Shows or hides this panel depending on whether or not its active.
       *
       * @method toggleVisibility
       * @private
       */

      toggleVisibility: function() {
        var display = this.get('active') ? '' : 'none';
        this.$().css('display', display);
      }.observes('active'),

      /**
       * Registers with the TabsComponent.
       *
       * @method registerWithTabs
       * @private
       */

      registerWithTabs: function() {
        this.get('parentView').registerTabPanel(this);
      }.on('didInsertElement'),

      unregisterWithTabs: function() {
        this.get('parentView').unregisterTabPanel(this);
      }.on('willDestroyElement')

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

      /**
       * See http://www.w3.org/TR/wai-aria/roles#tab
       *
       * @property role
       * @type String
       * @private
       */

      role: 'tab',

      /**
       * Sets the [selected] attribute on the element when this tab is active.
       * Makes sure to remove the attribute completely when not selected.
       *
       * @property selected
       * @type Boolean
       */

      selected: function() {
        return this.get('active') ? 'selected' : null;
      }.property('active'),

      /**
       * Makes the selected tab keyboard tabbable, also prevents tabs from getting
       * focus when clicked with a mouse.
       *
       * @property tabindex
       * @type Number
       */

      tabindex: function() {
        return this.get('active') ? 0 : null;
      }.property('active'),

      /**
       * Reference to the parent TabsComponent instance.
       *
       * @property tabs
       * @type TabsComponent
       */

      tabs: alias('parentView.parentView'),

      /**
       * Reference to the parent TabListComponent instance.
       *
       * @property tabs
       * @type TabList
       */

      tabList: alias('parentView'),

      /**
       * Tells screenreaders which panel this tab controls.
       *
       * @property 'aria-controls'
       * @type String
       * @private
       */

      'aria-controls': alias('tabPanel.elementId'),

      /**
       * Tells screenreaders whether or not this tab is selected.
       *
       * @property 'aria-selected'
       * @type String
       * @private
       */

      'aria-selected': function() {
        // coerce to ensure a "true" or "false" attribute value
        return this.get('active')+'';
      }.property('active'),

      /**
       * Tells screenreaders whether or not this tabs panel is expanded.
       *
       * @property 'aria-expanded'
       * @type String
       * @private
       */

      'aria-expanded': alias('aria-selected'),

      /**
       * Whether or not this tab is selected.
       *
       * @property active
       * @type Boolean
       */

      active: function(key, val) {
        return this.get('tabs.activeTab') === this;
      }.property('tabs.activeTab'),

      /**
       * Selects this tab, bound to click.
       *
       * @method select
       * @param [options]
       *   @param {*} [options.focus] - focuses the element when selected.
       */

      select: function(options) {
        this.get('tabs').select(this);
        if (options && options.focus) {
          Ember.run.schedule('afterRender', this, function() {
            this.$().focus();
          });
        }
      }.on('click'),

      /**
       * The index of this tab in the TabListComponent instance.
       *
       * @property index
       * @type Number
       */

      index: function() {
        return this.get('tabList.tabs').indexOf(this);
      }.property('tabList.tabs.@each'),

      /**
       * Reference to the associated TabPanel instance.
       *
       * @property tabPanel
       * @type TabPanelComponent
       */

      tabPanel: function() {
        var index = this.get('index');
        var panels = this.get('tabs.tabPanels');
        return panels && panels.objectAt(index);
      }.property('tabs.tabPanels.@each'),

      /**
       * Selects this tab when the TabsComponent selected-index property matches
       * the index of this tab. Mostly useful for query-params support.
       *
       * @method selectFromTabsSelectedIndex
       * @private
       */

      selectFromTabsSelectedIndex: function() {
        var activeTab = this.get('tabs.activeTab');
        if (activeTab === this) return; // this was just selected
        var index = parseInt(this.get('tabs.selected-index'), 10);
        var myIndex = this.get('index');
        if (index === myIndex) {
          this.select();
        }
      }.observes('tabs.selected-index').on('didInsertElement'),

      /**
       * Registers this tab with the TabListComponent instance.
       *
       * @method registerWithTabList
       * @private
       */

      registerWithTabList: function() {
        this.get('tabList').registerTab(this);
      }.on('didInsertElement'),

      unregisterWithTabList: function() {
        this.get('tabList').unregisterTab(this);
      }.on('willDestroyElement')


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
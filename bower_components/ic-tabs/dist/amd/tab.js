define(
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
  });
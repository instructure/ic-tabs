import { Component, computed } from 'ember';

var alias = computed.alias;

export default Component.extend({

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
    if (val === true) {
      Ember.run.schedule('afterRender', this, 'activate');
      return true;
    }
    return this.get('tabs.activeTab') === this;
  }.property('tabs.activeTab'),

  activate: function(opts) {
    this.get('tabs').activate(this);
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

  activateFromTabsActiveIndex: function() {
    var activeTab = this.get('tabs.activeTab');
    if (activeTab === this) return;
    var index = parseInt(this.get('tabs.active-index'), 10);
    var myIndex = this.get('index');
    if (index === myIndex) {
      this.activate();
    }
  }.observes('tabs.active-index').on('didInsertElement'),

  registerWithTabList: function() {
    this.get('tabList').registerTab(this);
  }.on('didInsertElement')

});


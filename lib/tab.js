import { Component, computed } from 'ember';

var alias = computed.alias;

export default Component.extend({

  tagName: 'ic-tab',

  attributeBindings: [
    'role',
    'aria-controls',
    'aria-selected',
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

  tabPanel: function() {
    var index = this.get('tabList.tabs').indexOf(this);
    var panels = this.get('tabs.tabPanels');
    return panels && panels.objectAt(index);
  }.property('tabs.tabPanels.@each'),

  activateIfFirstOrActive: function() {
    if (this.get('active') || !this.get('tabs.activeTab')) this.activate();
  }.on('didInsertElement'),

  registerWithTabList: function() {
    this.get('tabList').registerTab(this);
  }.on('didInsertElement')

});


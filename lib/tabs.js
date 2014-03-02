import { Component } from 'ember';

export default Component.extend({

  tagName: 'ic-tabs',

  activeTab: null,

  activate: function(tab) {
    this.set('activeTab', tab);
  }

});


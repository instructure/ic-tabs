"use strict";
/*
 * http://www.w3.org/TR/wai-aria/roles#tab
 * http://www.w3.org/TR/wai-aria/roles#tablist
 * http://www.w3.org/TR/wai-aria/roles#tabpanel
 */

var TabComponent = require("./tab")["default"] || require("./tab");
var TabListComponent = require("./tab-list")["default"] || require("./tab-list");
var TabPanelComponent = require("./tab-panel")["default"] || require("./tab-panel");
var TabsComponent = require("./tabs")["default"] || require("./tabs");
var Application = require("ember").Application;

Application.initializer({
  name: 'ic-tabs',
  initialize: function(container) {
    container.register('component:ic-tab',       TabComponent);
    container.register('component:ic-tab-list',  TabListComponent);
    container.register('component:ic-tab-panel', TabPanelComponent);
    container.register('component:ic-tabs',      TabsComponent);
  }
});

exports.TabComponent = TabComponent;
exports.TabListComponent = TabListComponent;
exports.TabPanelComponent = TabPanelComponent;
exports.TabsComponent = TabsComponent;
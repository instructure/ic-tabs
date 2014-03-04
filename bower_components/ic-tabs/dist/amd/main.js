define(
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
  });
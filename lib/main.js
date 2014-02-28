import TabsComponent from './tabs';
import TabComponent from './tab';
import { Application } from 'ember';

Application.initializer({
  name: 'ic-tabs',
  initialize: function(container) {
    container.register('component:ic-tabs', TabsComponent);
    container.register('component:ic-tab', TabComponent);
  }
});

export { TabsComponent, TabComponent };


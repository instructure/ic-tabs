module.exports = function(broccoli) {
  return require('broccoli-dist-es6-module')(broccoli.makeTree('lib'), {
    global: 'ic.tabs',
    packageName: 'ic-tabs',
    main: 'main',
    shim: {
      'ember': 'Ember'
    }
  });
};


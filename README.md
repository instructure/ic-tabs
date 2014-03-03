ic-tabs
=======

[WAI-ARIA][wai-aria] Accessible tab component for [Ember.js][ember].

Installation
------------

```sh
$ npm install ic-tabs
```

or ...

```sh
$ bower install ic-tabs
```

or just grab your preferred distribution from `dist/`.

Then include the script(s) into your application:

### npm+browserify

`require('ic-tabs')`

### amd

Register `ic-tabs` as a [package][rjspackage], then:

`define(['ic-tabs'], ...)`

### named-amd

please ... stop ...

### globals

`<script src="bower_components/ic-tabs/dist/globals/main.js"></script>`

Usage
-----

```handlebars
{{#ic-tabs}}
  {{#ic-tab-list}}
    {{#ic-tab}}Foo{{/ic-tab}}
    {{#ic-tab}}Bar{{/ic-tab}}
    {{#ic-tab}}Baz{{/ic-tab}}
  {{/ic-tab-list}}

  {{#ic-tab-panel}}
    <h2>Foo</h2>
  {{/ic-tab-panel}}

  {{#ic-tab-panel}}
    <h2>Bar</h2>
  {{/ic-tab-panel}}

  {{#ic-tab-panel}}
    <h2>Baz</h2>
  {{/ic-tab-panel}}
{{/ic-tabs}}
```

- `ic-tab-list` must be an immediate child of `ic-tabs`
- `ic-tab` must be an immediate child of `ic-tab-list`
- `ic-tab-panel` must be an immediate child of `ic-tabs`

Options
-------

- `{{ic-tab active-index=prop}}` - binds the active-index to prop,
  mostly useful for `queryParams`.

Contributing
------------

```sh
$ git clone <this repo>
$ npm install
$ npm test
# during dev
$ broccoli serve
# new tab
$ karma start
```

Make a new branch, send a pull request, squashing commits into one
change is preferred.



  [rjspackage]:http://requirejs.org/docs/api.html#packages
  [ember]:http://emberjs.com
  [wai-aria]:http://www.w3.org/TR/wai-aria/roles#tab


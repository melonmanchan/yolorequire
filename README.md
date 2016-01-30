# Yolorequire

Tired of your awesome webscale app crashing because of dependancies missing from package.json?
Then look no further than yolorequire!

Yolorequire turns this...

```js
var express = require('express');

---------------------------------

module.js:340
    throw err;
    ^
Error: Cannot find module 'express'
    at Function.Module._resolveFilename (module.js:338:15)
    at Function.Module._load (module.js:289:25)
    at Module.require (module.js:366:17)
    at require (module.js:385:17)
    at Object.<anonymous> (/home/matti/Projects/JS/yolorequire/test.js:1:77)
    at Module._compile (module.js:425:26)
    at Object.Module._extensions..js (module.js:432:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:313:12)
    at Function.Module.runMain (module.js:457:10)
```

into this!


```js
require('yolorequire')(['--save', '--save-exact']);
var express = require('express');

---------------------------------

Looks like module express was not found! Installing...

<NPM OUTPUT>
```

And everything is installed and just works again! No biggie!

## Tips and tricks

You can pass command line parameters to npm either as an array of strings or a single string!

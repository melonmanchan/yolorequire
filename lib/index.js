'use strict';

var cp  = require('child_process');
var log = console.log;

module.exports = function () {

    module.constructor.prototype.require = function (path) {

        var self = this;

        try {
            return self.constructor._load(path, self);
        } catch (e) {
            if (e.code !== 'MODULE_NOT_FOUND') {
             // Bail out, something went seriously wrong here!
                throw e;
            }
            // Trying to import local file, not much we can help with here!
            else if (path.charAt(0) === '.' || path.charAt(0) === '/' ) {
                log('Local module at path ' + path + ' was not found!')
                throw e;
            }

            else {
                log('Looks like module ' + path  + ' was not found! Installing...');
                var results = cp.execSync('npm i ' + path, {stdio : [0, 1, 2]})
                if (results && results.err) {
                    throw results.err;
                } else {
                    return self.constructor._load(path, self);
                }
            }
        }
    }
}


'use strict';

var cp       = require('child_process');
var validate = require('validate-npm-package-name');
var log      = console.log;

module.exports = function (npmOptions) {

    if (typeof npmOptions != 'string' && typeof npmOptions != 'undefined' && npmOptions.constructor !== Array) {
        throw new Error('Parameter must be an array or a single string!')
    }
    npmOptions = [].concat(npmOptions);

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

                var isValid = validate(path);

                if (isValid.validForNewPackages === false && isValid.validForOldPackages === false) {
                    throw isValid.errors;
                }

                log('Looks like module ' + path  + ' was not found! Installing...');
                var cmdParameters = npmOptions.join(' ');

                var results = cp.execSync('npm i ' + cmdParameters + ' ' + path, {stdio : [0, 1, 2]})
                if (results && results.err) {
                    throw results.err;
                } else {
                    return self.constructor._load(path, self);
                }
            }
        }
    }
}


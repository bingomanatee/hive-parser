var _ = require('underscore');
var util = require('util');
var path = require('path');
var fs = require('fs');
var _DEBUG = false;
var Component = require('hive-component');
var Gate = require('gate');
var Q = require('q');

/* ************************************
 *
 * ************************************ */

/* ******* CLOSURE ********* */

var _mixins = {
	test:    function (obj) {
		var k = this.get_config('key');
		if (!k) {
			return true; // always respond
		} else if (_.isRegExp(k)) {
			return k.test(obj.key);
		} else {
			return (obj.key == k);
		}
	},
	respond: function (params) {
		throw new Error('each handler must provide a respond handler')
	}
};

/* ********* EXPORTS ******** */

module.exports = function (mixins, config, cb) {
	if (_.isFunction(mixins)) {
		mixins = {
			respond: mixins
		}
	}

	if (_DEBUG) console.log('handler mixins: %s', util.inspect(mixins.respond.toString()));

	if (_.isString(config)) {
		config = {
			key: config
		}
	}

	var handler = Component([mixins, _mixins], config);
	if (cb) {
		handler.init(cb);
	} else {
		var defer = Q.defer();
		handler.init(function (err, handler) {
			if (err) {
				defer.reject(err);
			} else {
				defer.resolve(handler);
			}
		});
		return defer.promise
	}

}; // end export function
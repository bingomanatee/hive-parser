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
	parse: function (obj, cb) {
		var gate = Gate.create();
		_.each(obj, function (value, key) {
			this.emit('property', {value: value, key: key, root: obj, loader: this, gate: gate});
		}, this);
		gate.await(cb);
	}
};

/* ********* EXPORTS ******** */

module.exports = function (config, cb) {
	if (_.isArray(config)) {
		config = {
			handlers: config
		}
	}

	var parser = Component(_mixins, [
		config,
		{
			handlers:   [],
			init_tasks: [
				function (cb) {

					this.get_config('handlers').forEach(function (handler) {
						if (_DEBUG)        console.log('handler as listener: %s', util.inspect(handler));
						if (_DEBUG)            console.log('hanlder respond: %s', util.inspect(handler.respond.toString()));
						this.addListener('property', function (params) {
							if (handler.test(params)) {
								_.bind(handler.respond, this)(params);
							}
						})
					}, this);
					cb();
				}
			]
		}
	]);

	if (cb) {
		parser.init(cb);
	} else {
		var defer = Q.defer();
		parser.init(function (err, parser) {
			if (err) {
				defer.reject(err);
			} else {
				defer.resolve(parser);
			}
		});

		return defer.promise;
	}

}; // end export function
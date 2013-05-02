var _ = require('underscore');
var util = require('util');
var path = require('path');
var fs = require('fs');
var _DEBUG = false;
var hive_parser = require('./../index');

/* ************************************
 * 
 * ************************************ */

/* ******* CLOSURE ********* */
var handler2;

/* ********* EXPORTS ******** */

 function make_handler (found_alphas) {
	return handler2 = hive_parser.Handler({
		test:    function (params) {
		//	console.log('testing %s %s', params.key, util.inspect(params.value));
			return true; // parse any node
		},
		respond: function (params) {
			// {value: value, key: key, root: obj, loader: this, gate: gate}
			//console.log('alpha params key: %s', params.key);
			if (params.key == 'alpha') {
			//	console.log('pushing %s', util.inspect(params.value));
				found_alphas.push(params.value);
			} else if (_.isObject(params.value)) {
				var l = params.gate.latch();

				make_handler(found_alphas).then(function(handler){
					hive_parser.Parser([handler])
						.then(function (parser) {
							parser.parse(params.value, l);
						});

				}).done();

			}

		}

	});
}; // end export function

module.exports = make_handler;
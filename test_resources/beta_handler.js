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

/* ********* EXPORTS ******** */

module.exports = function (found_nodes) {
	return hive_parser.Handler(function (params) { found_nodes.push(params.value); }, 'bar');
} // end export function
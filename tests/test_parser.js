var tap = require('tap');
var path = require('path');
var util = require('util');
var _ = require('underscore');
var hive_parser = require('./../index');

var root = (path.resolve(__dirname, '../test_resources'));
var alpha_handler = require(path.resolve(root, 'alpha_handler'));
var beta_handler = require(path.resolve(root, 'beta_handler'));

var _DEBUG = false;

/* *********************** TEST SCAFFOLDING ********************* */

var data = require(path.resolve(root, 'test_data_1.json'));

/* ************************* TESTS ****************************** */

if (true) {
	tap.test('basic flat parser', function (t) {
		var found_nodes = [];
		hive_parser.Handler(function (params) {
			found_nodes.push(params.value);
		}, 'bar', function (err, handler) {
			hive_parser.Parser([handler], function (err, parser) {
				parser.parse(data, function () {
					t.deepEqual(found_nodes, [
						{ alpha: [ 4, 5, 6 ], vey: 'beta' }
					], 'found nodes');
					t.end();
				});
			});
		});
	}) // end tap.test 1
}

if (true) {
	tap.test('flat parser using promises', function (t) {
		var found_nodes = [];
		hive_parser.Handler(function (params) {
			found_nodes.push(params.value);
		}, 'bar')
			.then(function (handler) {
				return hive_parser.Parser([handler]);
			})
			.then(function (parser) {
				parser.parse(data, function () {
					t.deepEqual(found_nodes, [
						{ alpha: [ 4, 5, 6 ], vey: 'beta' }
					], 'found nodes');
					t.end();
				});
			});

	}) // end tap.test 2
}

if (true) {
	tap.test('deep parser with open handler', function (t) {
			var found_nodes = [];
			var found_alphas = [];
			var handler1, handler2;
			beta_handler(found_nodes)
				.then(function (handler) {
					handler1 = handler;
					return alpha_handler(found_alphas);
				})
				.then(function (handler) {
					handler2 = handler;
					return hive_parser.Parser([handler1, handler2])
				})
				.then(function (parser) {
					parser.parse(data, function () {
						t.deepEqual(found_nodes, [
							{ alpha: [ 4, 5, 6 ], vey: 'beta' }
						], 'found nodes');

						t.deepEqual(found_alphas, [
							[ 1, 2, 3 ],
							[ 4, 5, 6 ]
						], 'found alphas');
						t.end();
					});
				})
		}
	); // end tap.test 2
}
	 
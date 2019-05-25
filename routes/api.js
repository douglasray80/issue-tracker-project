/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

const expect = require('chai');
const { MongoClient, ObjectId } = require('mongodb');

module.exports = function(app) {
	MongoClient.connect(process.env.DB, (err, db) => {
		// prettier-ignore
		app.route('/api/issues/:project')

			.get(function(req, res) {
				var project = req.params.project;
				console.log(project)
			})

			.post(function(req, res) {
				var project = req.params.project;
			})

			.put(function(req, res) {
				var project = req.params.project;
			})

			.delete(function(req, res) {
				var project = req.params.project;
			});
	});
};

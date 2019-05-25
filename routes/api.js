/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

module.exports = function(app, db) {
	app
		.route('/api/issues/:project')
		.get(function(req, res) {
			const project = req.params.project;
			console.log(project);
		})

		.post(function(req, res, next) {
			const timestamp = new Date();
			const project = req.params.project;
			const { created_by, issue_text, issue_title } = req.body;
			const issue = {
				created_on: timestamp,
				updated_on: timestamp,
				open: true,
				...req.body
			};
			if (!created_by || !issue_text || !issue_title) {
				return res.json({ error: 'You have not completed the form.' });
			} else {
				db.collection(project).insertOne(issue, (err, doc) => {
					if (err) {
						res.json({ msg: 'There was an error adding your issue', err });
					} else {
						res.json(issue);
					}
				});
			}
		})

		.put(function(req, res) {
			const project = req.params.project;
		})

		.delete(function(req, res) {
			const project = req.params.project;
		});
};

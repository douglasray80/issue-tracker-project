/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';
// const mongoose = require('mongoose');
const Issue = require('../models/Issue');

module.exports = function(app, db) {
  app
    .route('/api/issues/:project')
    .get(function(req, res) {
      const project = req.params.project;
      const queryParams = req.query;
      Issue.find({ project_name: project, ...queryParams }, (err, items) => {
        res.json(items);
      });
    })

    .post(function(req, res) {
      const timestamp = new Date();
      const { project } = req.params;
      const { created_by, issue_text, issue_title, ...other } = req.body;
      if (!created_by || !issue_text || !issue_title) {
        return res.json({ error: 'You have not completed the form.' });
      } else {
        const issue = new Issue({
          project_name: project,
          created_by,
          issue_text,
          issue_title,
          created_on: timestamp,
          updated_on: timestamp,
          open: true,
          ...other
        });
        issue.save((err, data) => {
          if (err) {
            res.json({ msg: 'There was an error adding your issue', err });
          } else {
            res.json(data);
          }
        });
      }
    })

    .put(function(req, res) {
      const { _id, ...other } = req.body;
      if (!_id || Object.keys(other).length < 1) {
        res.send('no updated field sent');
      } else {
        Object.keys(other).map(key =>
          // if form field is an empty string, set to undefined
          other[key] === '' ? (other[key] = undefined) : null
        );
        Issue.findByIdAndUpdate(
          _id,
          { ...other, updated_on: new Date() },
          { omitUndefined: true },
          (err, data) => {
            if (err) {
              res.send(`could not update ${_id}`);
            } else {
              res.send('successfully updated');
            }
          }
        );
      }
    })

    .delete(function(req, res) {
      const project = req.params.project;
    });
};

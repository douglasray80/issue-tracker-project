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
    // .get(function(req, res) {
    //   const project = req.params.project;
    //   const queryParams = req.query;
    //   db.collection(project)
    //     .find(queryParams)
    //     .toArray((err, items) => {
    //       console.log(queryParams);
    //       console.log(items);
    //       res.json(items);
    //     });
    // })

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
    });

  // .put(function(req, res) {
  //   const project = req.params.project;
  // const {
  //   _id,
  //   issue_title,
  //   issue_text,
  //   created_by,
  //   assigned_to,
  //   status_text,
  //   open
  // } = req.body;
  // if (
  //   !issue_title &&
  //   !issue_text &&
  //   !created_by &&
  //   !assigned_to &&
  //   !status_text &&
  //   typeof open === 'undefined'
  // ) {
  //   console.log(req.body._id);
  //   if (!req.body._id) {
  //     res.send('no updated field sent');
  //   } else {
  //     db.collection(project).findOneAndUpdate(
  //       { _id: req.body._id },
  //       { $set: { ...req.body, updated_on: new Date() } },
  //       (err, doc) => {
  //         if (err) {
  //           res.json(`could not update ${_id}`);
  //         } else {
  //           res.send('successfully updated');
  //         }
  //       }
  //     );
  //   }
  // })

  // .delete(function(req, res) {
  //   const project = req.params.project;
  // });
};

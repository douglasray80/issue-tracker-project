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
  app.get('/api/test', res => res.json('test'));

  app
    .route('/api/issues/:project')
    .get(function(req, res) {
      const project = req.params.project;
      console.log(req);
    })

    .post(function(req, res, next) {
      const project = req.params.project;
      console.log(project);
      db.collection('issues').insertOne(
        {
          test: 'test'
        },
        (err, doc) => {
          if (err) {
            res.json(err);
          } else {
            console.log(doc);
            next(null, doc);
          }
        }
      );
    })

    .put(function(req, res) {
      const project = req.params.project;
    })

    .delete(function(req, res) {
      const project = req.params.project;
    });
};

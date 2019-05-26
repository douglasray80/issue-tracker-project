/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  suite('POST /api/issues/{project} => object with issue data', function() {
    test('Every field filled in', function(done) {
      chai
        .request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Bilbo',
          assigned_to: 'Bilbo',
          status_text: 'In QA'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.isTrue(res.body.open, 'Issue status exists');
          assert.isDefined(res.body._id, 'Issue _id exists');
          assert.isDefined(res.body.created_on, 'Issue timestamp exists');
          assert.equal(res.body.created_on, res.body.updated_on);
          assert.equal(res.body.assigned_to, 'Bilbo');
          assert.equal(res.body.status_text, 'In QA');
          done();
        });
    });

    test('Required fields filled in', function(done) {
      chai
        .request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'some title',
          issue_text: 'some text',
          created_by: 'Bilbo'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.equal(res.body.created_by, 'Bilbo');
          assert.equal(res.body.issue_title, 'some title');
          assert.equal(res.body.issue_text, 'some text');
          done();
        });
    });

    test('Missing required fields', function(done) {
      chai
        .request(server)
        .post('/api/issues/test')
        .send({
          assigned_to: 'Frodo',
          status_text: 'High Priority'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.equal(res.body.error, 'You have not completed the form.');
          done();
        });
    });
  });

  suite('PUT /api/issues/{project} => text', function() {
    test('No body', function(done) {
      chai
        .request(server)
        .put('/api/issues/test')
        .send({ _id: '5cea6a6e825f192a8991f487' })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'text/html', 'Response should be text');
          assert.equal(res.text, 'no updated field sent');
          done();
        });
    });

    test('One field to update', function(done) {
      chai
        .request(server)
        .put('/api/issues/test')
        .send({
          _id: '5cea6a6e825f192a8991f487',
          assigned_to: 'Frodo'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'text/html', 'Response should be text');
          assert.equal(res.text, 'successfully updated');
          done();
        });
    });

    test('Multiple fields to update', function(done) {
      chai
        .request(server)
        .put('/api/issues/test')
        .send({
          _id: '5cea6a6e825f192a8991f487',
          issue_title: 'new title',
          issue_text: 'new issue text',
          status_text: 'high priority'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.type, 'text/html', 'Response should be text');
          assert.equal(res.text, 'successfully updated');
          done();
        });
    });
  });

  suite(
    'GET /api/issues/{project} => Array of objects with issue data',
    function() {
      test('No filter', function(done) {
        chai
          .request(server)
          .get('/api/issues/test')
          .query({})
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], 'issue_title');
            assert.property(res.body[0], 'issue_text');
            assert.property(res.body[0], 'created_on');
            assert.property(res.body[0], 'updated_on');
            assert.property(res.body[0], 'created_by');
            assert.property(res.body[0], 'assigned_to');
            assert.property(res.body[0], 'open');
            assert.property(res.body[0], 'status_text');
            assert.property(res.body[0], '_id');
            done();
          });
      });

      test('One filter', function(done) {
        chai
          .request(server)
          .get('/api/issues/test')
          .query({ assigned_to: 'Frodo' })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.equal(res.body[0].assigned_to, 'Frodo');
            done();
          });
      });

      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        chai
          .request(server)
          .get('/api/issues/test')
          .query({ assigned_to: 'Frodo', status_text: 'high priority' })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.equal(res.body[0].assigned_to, 'Frodo');
            assert.equal(res.body[0].status_text, 'high priority');
            done();
          });
      });
    }
  );

  // suite('DELETE /api/issues/{project} => text', function() {
  //   test('No _id', function(done) {});

  //   test('Valid _id', function(done) {});
  // });
});

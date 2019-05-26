const Issue = require('../models/Issue');

function getHandler(req, res) {
  const project = req.params.project;
  const queryParams = req.query;
  Issue.find({ project_name: project, ...queryParams }, (err, items) => {
    res.json(items);
  });
}

function postHandler(req, res) {
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
}

function putHandler(req, res) {
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
}

function deleteHandler(req, res) {
  const project = req.params.project;
  const { _id } = req.body;
  if (!_id) {
    res.send('_id error');
  } else {
    Issue.findByIdAndDelete(_id, (err, data) => {
      if (err) {
        res.send(`could not delete ${_id}`);
      } else {
        res.send(`deleted ${_id}`);
      }
    });
  }
}

module.exports = { getHandler, postHandler, putHandler, deleteHandler };

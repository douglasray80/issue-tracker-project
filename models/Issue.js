const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  project_name: {
    type: String,
    required: true
  },
  issue_title: {
    type: String,
    required: true
  },
  issue_text: {
    type: String,
    required: true
  },
  created_by: {
    type: String,
    required: true
  },
  assigned_to: {
    type: String
  },
  status_text: {
    type: String
  },
  open: {
    type: Boolean
  },
  created_on: { type: Date, default: Date.now },
  updated_on: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Issue', issueSchema);

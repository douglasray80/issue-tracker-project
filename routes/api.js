/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';
const controllers = require('../controllers');

module.exports = function(app) {
  app
    .route('/api/issues/:project')
    .get(controllers.getHandler)
    .post(controllers.postHandler)
    .put(controllers.putHandler)
    .delete(controllers.deleteHandler);
};

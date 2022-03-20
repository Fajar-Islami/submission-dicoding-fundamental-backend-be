const method = require('../../internal/helper/constant');

const routes = (handler) => [
  {
    method: method.POST,
    path: '/users',
    handler: handler.postUserHandler,
  },
];

module.exports = routes;

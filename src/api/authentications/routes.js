const method = require('../../internal/helper/constant');

const routes = (handler) => [
  {
    method: method.POST,
    path: '/authentications',
    handler: handler.postAuthenticationHandler,
  },
  {
    method: method.PUT,
    path: '/authentications',
    handler: handler.putAuthenticationHandler,
  },
  {
    method: method.DELETE,
    path: '/authentications',
    handler: handler.deleteAuthenticationHandler,
  },
];

module.exports = routes;

const method = require('../../internal/helper/constant');

const routes = (handler) => [
  {
    method: method.POST,
    path: '/albums',
    handler: handler.postAlbumHandler,
  },
  {
    method: method.GET,
    path: '/albums',
    handler: handler.getAlbumsHandler,
  },
  {
    method: method.GET,
    path: '/albums/{id}',
    handler: handler.getAlbumByIdHandler,
  },
  {
    method: method.PUT,
    path: '/albums/{id}',
    handler: handler.updateAlbumHandler,
  },
  {
    method: method.DELETE,
    path: '/albums/{id}',
    handler: handler.deleteAlbumHandler,
  },
];

module.exports = routes;

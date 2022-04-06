const method = require('../../internal/helper/constant');

const routes = (handler) => [
  {
    method: method.POST,
    path: '/songs',
    handler: handler.postSongHandler,
  },
  {
    method: method.GET,
    path: '/songs',
    handler: handler.getSongsHandler,
  },
  {
    method: method.GET,
    path: '/songs/{id}',
    handler: handler.getSongByIdHandler,
  },
  {
    method: method.PUT,
    path: '/songs/{id}',
    handler: handler.updateSongHandler,
  },
  {
    method: method.DELETE,
    path: '/songs/{id}',
    handler: handler.deleteSongHandler,
  },
];

module.exports = routes;

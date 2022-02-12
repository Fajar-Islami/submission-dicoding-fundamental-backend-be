const AlbumHandler = require('./handler');
const routes = require('./routes');

const AlbumRepository = require('../../internal/domain/AlbumRepository');
const AlbumService = require('../../internal/service/AlbumService');

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { dbConfig, validator }) => {
    const AlbumRepo = new AlbumRepository(dbConfig);
    const AlbumSvc = new AlbumService(AlbumRepo);
    const albumsandler = new AlbumHandler(AlbumSvc, validator);

    server.route(routes(albumsandler));
  },
};

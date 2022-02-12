const SongHandler = require('./handler');
const routes = require('./routes');

const SongRepository = require('../../internal/domain/SongRepository');
const SongService = require('../../internal/service/SongService');

module.exports = {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { dbConfig, validator }) => {
    const SongRepo = new SongRepository(dbConfig);
    const SongSvc = new SongService(SongRepo);
    const songsandler = new SongHandler(SongSvc, validator);

    server.route(routes(songsandler));
  },
};

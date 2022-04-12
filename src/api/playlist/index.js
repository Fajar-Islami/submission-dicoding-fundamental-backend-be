const PlaylistHandler = require('./handler');
const routes = require('./routes');

const PlaylistRepository = require('../../internal/domain/PlaylistRepository');
const PlaylistService = require('../../internal/service/PlaylistService');

module.exports = {
  name: 'playlist',
  version: '1.0.0',
  register: async (server, { dbConfig, validator }) => {
    const PlaylistRepo = new PlaylistRepository(dbConfig);
    const PlaylistSvc = new PlaylistService(PlaylistRepo);
    const playlistHandler = new PlaylistHandler(
      PlaylistSvc,
      validator.CreatePlaylistPayloadSchema,
      validator.AddSongToPlaylist,
    );

    server.route(routes(playlistHandler));
  },
};

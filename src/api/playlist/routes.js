const method = require('../../internal/helper/constant');

const routes = (handler) => [
  {
    method: method.POST,
    path: '/playlists',
    handler: handler.createPlaylistHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: method.GET,
    path: '/playlists',
    handler: handler.getUserPlaylistHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: method.DELETE,
    path: '/playlists/{playlistId}',
    handler: handler.deleteUserPlaylistHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: method.POST,
    path: '/playlists/{playlistId}/songs',
    handler: handler.addSongsToUserPlaylistHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: method.GET,
    path: '/playlists/{playlistId}/songs',
    handler: handler.getSongsUserPlaylistHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: method.DELETE,
    path: '/playlists/{playlistId}/songs',
    handler: handler.deleteSongsFromUserPlaylistHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
];

module.exports = routes;

/*
Karena menerapkan authentication strategy,
maka setiap request.auth akan membawa nilai dari fungsi validate di app.js
jadi pengaksesannya request.auth.creadentials.id   // lihat app.js
*/

const SongHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const songsandler = new SongHandler(service, validator);

    server.route(routes(songsandler));
  },
};

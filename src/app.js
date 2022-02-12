const Hapi = require('@hapi/hapi');

const SongApi = require('./api/song');
const AlbumApi = require('./api/album');

const Validator = require('./internal/pkg/validator');

const CONFIG = require('./internal/config/config');
const { DBCONFIG } = require('./internal/infrastructure/postgre');

const init = async () => {
  const server = Hapi.server({
    port: CONFIG.PORT || 5000,
    host: CONFIG.HOST || 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: AlbumApi,
      options: {
        dbConfig: DBCONFIG,
        validator: Validator.validateAlbumPayload,
      },
    },
    {
      plugin: SongApi,
      options: {
        dbConfig: DBCONFIG,
        validator: Validator.validateSongPayload,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

module.exports = { init };

const Hapi = require('@hapi/hapi');

// const SongApi = require('./api/song');
const AlbumApi = require('./api/album');

// const SongRepository = require('./internal/domain/SongRepository');
const AlbumService = require('./internal/service/AlbumService');

const validator = require('./internal/pkg/validator');

const config = require('./internal/config/config');

const init = async () => {
  const AlbumSvc = new AlbumService();

  const server = Hapi.server({
    port: config.port,
    host: config.host,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    // {
    //   plugin: SongApi,
    //   options: {
    //     service: SongRepository,
    //     validator: SongValidator,
    //   },
    // },
    {
      plugin: AlbumApi,
      options: {
        service: AlbumSvc,
        validator: validator.AlbumValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

module.exports = { init };

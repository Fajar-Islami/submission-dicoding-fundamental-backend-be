const Hapi = require('@hapi/hapi');
const { Pool } = require('pg');

const SongApi = require('./api/song');
const AlbumApi = require('./api/album');

const AlbumRepository = require('./internal/domain/AlbumRepository');
const AlbumService = require('./internal/service/AlbumService');

const SongRepository = require('./internal/domain/SongRepository');
const SongService = require('./internal/service/SongService');

const Validator = require('./internal/pkg/validator');

const CONFIG = require('./internal/config/config');

const init = async () => {
  const DBPOOL = new Pool({
    max: CONFIG.PGMAXPOOL || 10,
    min: CONFIG.PGMINPOOL || 2,
  });

  const AlbumRepo = new AlbumRepository(DBPOOL);
  const AlbumSvc = new AlbumService(AlbumRepo);

  const SongRepo = new SongRepository(DBPOOL);
  const SongSvc = new SongService(SongRepo);

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
        service: AlbumSvc,
        validator: Validator.validateAlbumPayload,
      },
    },
    {
      plugin: SongApi,
      options: {
        service: SongSvc,
        validator: Validator.validateSongPayload,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

module.exports = { init };

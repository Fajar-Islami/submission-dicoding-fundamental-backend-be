const Hapi = require('@hapi/hapi');

const SongApi = require('./api/song');
const AlbumApi = require('./api/album');

const Validator = require('./internal/pkg/validator');

const CONFIG = require('./internal/config/config');
const { DBCONFIG } = require('./internal/infrastructure/postgre');
const ClientError = require('./internal/pkg/error/ClientError');

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

  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;

    if (response instanceof ClientError) {
      // membuat response baru dari response toolkit sesuai kebutuhan error handling
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    // jika bukan ClientError, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return response.continue || response;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

module.exports = { init };

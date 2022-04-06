const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const laabr = require('laabr');

const SongApi = require('./api/song');
const AlbumApi = require('./api/album');
const UsersApi = require('./api/users');
const AuthApi = require('./api/authentications');

const Validator = require('./internal/pkg/validator');
const tokenManager = require('./internal/helper/tokenManager');

const CONFIG = require('./internal/config/config');
const { DBCONFIG } = require('./internal/infrastructure/postgre');
const ClientError = require('./internal/pkg/error/ClientError');

const options = {
  formats: { onPostStart: ':time :start :level :message' },
  tokens: { start: () => '[start]' },
  indent: 0,
};

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

  //  plugin eksternal
  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: laabr,
      options,
    },
  ]);

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
    {
      plugin: UsersApi,
      options: {
        dbConfig: DBCONFIG,
        validator: Validator.validateUsersPayload,
      },
    },
    {
      plugin: AuthApi,
      options: {
        dbConfig: DBCONFIG,
        validator: Validator,
        tokenManager,
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

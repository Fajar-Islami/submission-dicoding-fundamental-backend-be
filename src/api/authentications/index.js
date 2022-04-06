const AuthHandler = require('./handler');
const routes = require('./routes');

const AuthRepository = require('../../internal/domain/AuthenticationsRepository');
const AuthService = require('../../internal/service/AuthService');
const UsersRepository = require('../../internal/domain/UsersRepository');
const UsersService = require('../../internal/service/UsersService');

module.exports = {
  name: 'authentications',
  version: '1.0.0',
  register: async (server, { dbConfig, validator, tokenManager }) => {
    const AuthRepo = new AuthRepository(dbConfig);
    const UsersRepo = new UsersRepository(dbConfig);

    const AuthSvc = new AuthService(AuthRepo);
    const UsersSvc = new UsersService(UsersRepo);

    const handler = new AuthHandler(AuthSvc, UsersSvc, tokenManager, validator);

    server.route(routes(handler));
  },
};

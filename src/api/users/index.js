const UsersHandler = require('./handler');
const routes = require('./routes');

const UsersRepository = require('../../internal/domain/UsersRepository');
const UsersService = require('../../internal/service/UsersService');

module.exports = {
  name: 'users',
  version: '1.0.0',
  register: async (server, { dbConfig, validator }) => {
    const UsersRepo = new UsersRepository(dbConfig);
    const UsersSvc = new UsersService(UsersRepo);
    const usersHandler = new UsersHandler(UsersSvc, validator);

    server.route(routes(usersHandler));
  },
};

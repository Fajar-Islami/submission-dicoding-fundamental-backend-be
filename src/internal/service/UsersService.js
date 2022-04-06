class UsersService {
  constructor(repository) {
    this._repository = repository;
  }

  async registerUser(payload) {
    return this._repository.registerUser(payload);
  }

  async verifyUser(payload) {
    return this._repository.verifyUserCredentail(payload);
  }
}

module.exports = UsersService;

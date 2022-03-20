class UsersService {
  constructor(repository) {
    this._repository = repository;
  }

  async registerUser(payload) {
    return this._repository.registerUser(payload);
  }
}

module.exports = UsersService;

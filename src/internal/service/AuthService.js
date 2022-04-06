class AuthService {
  constructor(repository) {
    this._repository = repository;
  }

  async addRefreshToken(refreshToken) {
    return this._repository.addRefreshToken(refreshToken);
  }

  async verifyRefreshToken(refreshToken) {
    return this._repository.verifyRefreshToken(refreshToken);
  }

  async deleteRefreshToken(refreshToken) {
    return this._repository.deleteRefreshToken(refreshToken);
  }
}

module.exports = AuthService;

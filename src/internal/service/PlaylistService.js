class PlaylistService {
  constructor(repository) {
    this._repository = repository;
  }

  async addPlaylist({ name, owner }) {
    return this._repository.addPlaylist({ name, owner });
  }

  async getUserPlaylist(owner) {
    return this._repository.getPlaylist(owner);
  }

  async deleteUserPlaylist(id, owner) {
    await this._repository.verifyPlaylistOwner(id, owner);
    return this._repository.deletePlaylist(id);
  }
}

module.exports = PlaylistService;

class AlbumService {
  constructor(repository) {
    this._repository = repository;
  }

  async addAlbum({ name, year }) {
    return this._repository.addAlbum({ name, year });
  }

  async getAllAlbum() {
    return this._repository.getAllAlbum();
  }

  async getAlbumBydId(id) {
    return this._repository.getAlbumBydId(id);
  }

  async editAlbumById(id, { name, year }) {
    await this._repository.getAlbumBydId(id);
    return this._repository.editAlbumById(id, { name, year });
  }

  async deleteAlbumById(id) {
    await this._repository.getAlbumBydId(id);
    return this._repository.deleteAlbumById(id);
  }
}

module.exports = AlbumService;

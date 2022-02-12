class SongService {
  constructor(repository) {
    this._repository = repository;
  }

  async addSong(payload) {
    return this._repository.addSong(payload);
  }

  async getAllSong(query) {
    return this._repository.getAllSong(query);
  }

  async getSongBydId(id) {
    return this._repository.getSongBydId(id);
  }

  async editSongById(id, payload) {
    await this._repository.getSongBydId(id);
    return this._repository.editSongById(id, payload);
  }

  async deleteSongById(id) {
    await this._repository.getSongBydId(id);
    return this._repository.deleteSongById(id);
  }
}

module.exports = SongService;

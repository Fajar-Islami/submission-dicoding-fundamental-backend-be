class SongHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.updateSongHandler = this.updateSongHandler.bind(this);
    this.deleteSongHandler = this.deleteSongHandler.bind(this);
  }

  async postSongHandler(request, h) {
    const { payload } = request;
    this._validator(payload);

    const songId = await this._service.addSong(payload);

    const response = h.response({
      status: 'success',
      data: {
        songId,
      },
    });

    response.code(201);
    return response;
  }

  async getSongsHandler(request) {
    const songs = await this._service.getAllSong(request.query);
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler(request) {
    const { id } = request.params;
    const song = await this._service.getSongBydId(id);
    return {
      status: 'success',
      data: {
        song,
      },
    };
  }

  async updateSongHandler(request) {
    const { payload } = request;
    this._validator(payload);
    const { id } = request.params;
    await this._service.getSongBydId(id);

    await this._service.editSongById(id, payload);

    return {
      status: 'success',
      message: 'Sukses update song',
    };
  }

  async deleteSongHandler(request) {
    const { id } = request.params;
    await this._service.getSongBydId(id);
    await this._service.deleteSongById(id);

    return {
      status: 'success',
      message: 'Sukses hapus song',
    };
  }
}

module.exports = SongHandler;

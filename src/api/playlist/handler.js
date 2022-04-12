class PlaylistHandler {
  constructor(service, createPlaylistValidator, addSongToPlaylistValidator) {
    this._service = service;

    this._createPlaylistValidator = createPlaylistValidator;
    this._addSongToPlaylistValidator = addSongToPlaylistValidator;

    this.createPlaylistHandler = this.createPlaylistHandler.bind(this);
    this.getUserPlaylistHandler = this.getUserPlaylistHandler.bind(this);
    this.deleteUserPlaylistHandler = this.deleteUserPlaylistHandler.bind(this);
  }

  async createPlaylistHandler(request, h) {
    const { payload } = request;
    const { id: owner } = request.auth.credentials;

    this._createPlaylistValidator(payload);

    const playlistId = await this._service.addPlaylist({
      name: payload.name,
      owner,
    });

    const response = h.response({
      status: 'success',
      data: {
        playlistId,
      },
    });

    response.code(201);
    return response;
  }

  async getUserPlaylistHandler(request) {
    const { id: ownerId } = request.auth.credentials;
    const playlists = await this._service.getUserPlaylist(ownerId);

    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async deleteUserPlaylistHandler(request) {
    const { id } = request.params;
    const { id: owner } = request.auth.credentials;

    await this._service.deleteUserPlaylist(id, owner);

    return {
      status: 'success',
      message: 'Sukses hapus playlist',
    };
  }
}

module.exports = PlaylistHandler;

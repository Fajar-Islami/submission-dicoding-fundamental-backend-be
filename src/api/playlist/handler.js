class PlaylistHandler {
  constructor(service, createPlaylistValidator, addSongToPlaylistValidator) {
    this._service = service;

    this._createPlaylistValidator = createPlaylistValidator;
    this._addSongToPlaylistValidator = addSongToPlaylistValidator;

    this.createPlaylistHandler = this.createPlaylistHandler.bind(this);
    this.getUserPlaylistHandler = this.getUserPlaylistHandler.bind(this);
    this.deleteUserPlaylistHandler = this.deleteUserPlaylistHandler.bind(this);

    this.addSongsToUserPlaylistHandler =
      this.addSongsToUserPlaylistHandler.bind(this);
    this.getSongsUserPlaylistHandler =
      this.getSongsUserPlaylistHandler.bind(this);
    this.deleteSongsFromUserPlaylistHandler =
      this.deleteSongsFromUserPlaylistHandler.bind(this);
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
    const { playlistId } = request.params;
    const { id: owner } = request.auth.credentials;

    await this._service.deleteUserPlaylist(playlistId, owner);

    return {
      status: 'success',
      message: 'Sukses hapus playlist',
    };
  }

  async addSongsToUserPlaylistHandler(request, h) {
    const { payload } = request;
    const { playlistId } = request.params;
    const { id: owner } = request.auth.credentials;

    this._addSongToPlaylistValidator(payload);

    const playlisSongId = await this._service.addSongToPlaylist(
      owner,
      playlistId,
      payload.songId,
    );
    const response = h.response({
      status: 'success',
      message: `Sukses menambahkan lagu dengan id ${playlisSongId}`,
    });
    response.code(201);
    return response;
  }

  async getSongsUserPlaylistHandler(request) {
    const { playlistId } = request.params;
    const { id: owner } = request.auth.credentials;

    const playlist = await this._service.getSongsFromPlaylist(
      owner,
      playlistId,
    );

    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async deleteSongsFromUserPlaylistHandler(request) {
    const { playlistId } = request.params;
    const { songId } = request.payload;
    const { id: owner } = request.auth.credentials;

    this._addSongToPlaylistValidator(request.payload);

    await this._service.deleteSongFromPlaylist(owner, playlistId, songId);

    return {
      status: 'success',
      message: 'Sukses hapus lagu dari playlist',
    };
  }
}

module.exports = PlaylistHandler;

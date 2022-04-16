class PlaylistService {
  constructor(playlistRepository) {
    this._playlistRepository = playlistRepository;
  }

  async addPlaylist({ name, owner }) {
    return this._playlistRepository.addPlaylist({ name, owner });
  }

  async getUserPlaylist(owner) {
    return this._playlistRepository.getPlaylist(owner);
  }

  async deleteUserPlaylist(id, owner) {
    await this._playlistRepository.verifyPlaylistOwner(id, owner);
    return this._playlistRepository.deletePlaylist(id);
  }

  async addSongToPlaylist(owner, playlistId, songId) {
    await this._playlistRepository.verifySongsExist(songId);
    await this._playlistRepository.verifyPlaylistOwner(playlistId, owner);
    return this._playlistRepository.addSongToPlaylist(playlistId, songId);
  }

  async getSongsFromPlaylist(owner, playlistId) {
    const detailPlaylist = await this._playlistRepository.verifyPlaylistOwner(
      playlistId,
      owner,
    );

    delete detailPlaylist.user_id;

    const songs = await this._playlistRepository.getSongsFromPlaylist(
      playlistId,
    );

    return { ...detailPlaylist, songs };
  }

  async deleteSongFromPlaylist(owner, playlistId, songId) {
    await this._playlistRepository.verifyPlaylistOwner(playlistId, owner);
    return this._playlistRepository.deleteSongFromPlaylist(playlistId, songId);
  }
}

module.exports = PlaylistService;

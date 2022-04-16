const { nanoid } = require('nanoid');
const {
  InvariantError,
  NotFoundError,
  AuthorizationError,
} = require('../pkg/error');

const tablePlaylists = 'playlists';
const tableUsers = 'users';
const tablePlayListsSong = 'playlist_songs';
const tableSongs = 'songs';

class PlaylistRepository {
  constructor(pool) {
    this._pool = pool;
  }

  async addPlaylist({ name, owner }) {
    try {
      const id = `playlist-${nanoid(16)}`;

      const query = {
        text: `INSERT INTO ${tablePlaylists} VALUES($1,$2,$3) RETURNING id`,
        values: [id, name, owner],
      };

      const { rows } = await this._pool.query(query);

      return rows[0].id;
    } catch (error) {
      throw new InvariantError('Playlist gagal ditambahkan');
    }
  }

  async getPlaylist(owner) {
    const query = {
      text: `SELECT a.id,a.name,b.username from ${tablePlaylists} a inner join ${tableUsers} b on a.owner = b.id  WHERE b.id = $1`,
      values: [owner],
    };

    const { rows } = await this._pool.query(query);

    return rows;
  }

  async deletePlaylist(id) {
    const query = {
      text: `DELETE FROM ${tablePlaylists} WHERE id = $1 RETURNING id`,
      values: [id],
    };

    const { rows } = await this._pool.query(query);

    if (!rows.length) {
      throw new NotFoundError('Playlist gagal dihapus');
    }
  }

  async addSongToPlaylist(playlistId, songId) {
    const query = {
      text: `INSERT INTO ${tablePlayListsSong}(playlist_id,song_id) values ($1,$2) RETURNING id`,
      values: [playlistId, songId],
    };

    const { rows } = await this._pool.query(query);

    if (!rows.length || !rows) {
      throw new InvariantError('Gagal menambahkan lagu ke playlist');
    }

    return rows[0].id;
  }

  async getSongsFromPlaylist(playlistId) {
    const query = {
      text: `SELECT s.id,s.title,s.performer FROM ${tablePlayListsSong} ps LEFT JOIN ${tableSongs} s ON ps.song_id = s.id WHERE ps.playlist_id = $1`,
      values: [playlistId],
    };
    console.log('query', query);

    const { rows } = await this._pool.query(query);

    return rows;
  }

  async deleteSongFromPlaylist(playlistId, songId) {
    const query = {
      text: `DELETE FROM ${tablePlayListsSong} WHERE playlist_id = $1 AND song_id= $2 RETURNING id`,
      values: [playlistId, songId],
    };

    const { rows } = await this._pool.query(query);

    if (!rows.length) {
      throw new NotFoundError('Lagu gagal dihapus dari playlist');
    }
  }

  async verifyPlaylistOwner(id, owner) {
    const query = {
      text: `SELECT p.id,p.name,u.username,u.id user_id FROM ${tablePlaylists} p LEFT JOIN ${tableUsers} u ON p.owner=u.id WHERE p.id= $1`,
      values: [id],
    };

    const { rows } = await this._pool.query(query);

    console.log('rows', rows);

    if (!rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    const playlist = rows[0];

    if (playlist.user_id !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }

    return playlist;
  }

  async verifySongsExist(songId) {
    const query = {
      text: `SELECT id FROM ${tableSongs} WHERE id = $1`,
      values: [songId],
    };

    const { rows } = await this._pool.query(query);

    if (!rows.length) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }
  }
}

module.exports = PlaylistRepository;

const { nanoid } = require('nanoid');
const {
  InvariantError,
  NotFoundError,
  AuthorizationError,
} = require('../pkg/error');

const tableName = 'playlists';

class PlaylistRepository {
  constructor(pool) {
    this._pool = pool;
  }

  async addPlaylist({ name, owner }) {
    const id = `playlist-${nanoid}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: `INSERT INTO ${tableName} VALUES ($1,$2,$3,$4,$5) RETURNING id`,
      valus: [id, name, owner, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Playlist gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getPlaylist(owner) {
    const query = {
      text: `SELECT id,name,owner from ${tableName} WHERE owner = $1`,
      values: [owner],
    };

    const { rows } = await this._pool.query(query);

    return rows;
  }

  async deletePlaylist(id) {
    const query = {
      text: `DELETE FROM ${tableName} WHERE id = $1 RETURNING id`,
      values: [id],
    };

    const { rows } = await this._pool.query(query);

    if (!rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }
  }

  async verifyPlaylistOwner(id, owner) {
    const query = {
      text: `SELECT * FROM ${tableName}  WHERE id = $1`,
      values: [id, owner],
    };

    const { rows } = await this._pool.query(query);

    if (!rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }

    const playlist = rows[0];

    if (playlist.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }
}

module.exports = PlaylistRepository;

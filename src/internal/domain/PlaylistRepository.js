const { nanoid } = require('nanoid');
const { InvariantError, NotFoundError } = require('../pkg/error');

const tableName = 'playlists';

class PlaylistRepository {
  constructor(pool) {
    this._pool = pool;
  }

  async addPlaylist({ name, owner }) {
    const id = `playlist-${nanoid}`;

    const query = {
      text: `INSERT INTO ${tableName} VALUES ($1,$2,$3) RETURNING id`,
      valus: [id, name, owner],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Playlist gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getPlaylist(owner) {
    const query = {
      text: `SELECT id,name,owner from ${tableName}  WHERE owner = $1`,
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
}

module.exports = PlaylistRepository;

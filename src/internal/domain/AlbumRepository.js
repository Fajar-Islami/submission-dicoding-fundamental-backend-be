const { nanoid } = require('nanoid');
const { InvariantError, NotFoundError } = require('../pkg/error');

const tableName = 'albums';

class AlbumRepository {
  constructor(pool) {
    this._pool = pool;
  }

  async addAlbum({ name, year }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();

    const query = {
      text: `INSERT INTO ${tableName} VALUES($1,$2,$3,$4,$5) RETURNING id`,
      values: [id, name, year, createdAt, createdAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Album gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getAllAlbum() {
    const { rows } = this._pool.query(`SELECT id,name,year FROM ${tableName}`);
    return rows;
  }

  async getAlbumBydId(id) {
    const queryGetAlbum = {
      text: `SELECT id,name,year FROM ${tableName} WHERE id =$1`,
      values: [id],
    };
    const queryGetSongs = {
      text: 'SELECT id,title,performer FROM songs WHERE album_id =$1',
      values: [id],
    };

    const result1 = await this._pool.query(queryGetAlbum);
    if (!result1.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }
    const result2 = await this._pool.query(queryGetSongs);

    result1.rows[0].songs = result2.rows;

    return result1.rows[0];
  }

  async editAlbumById(id, { name, year }) {
    const updateAt = new Date().toISOString();
    const query = {
      text: `UPDATE ${tableName} SET NAME = $1, YEAR = $2, updated_at = $3 WHERE id = $4 RETURNING id`,
      values: [name, year, updateAt, id],
    };

    const result = await this._pool.query(query);

    if (result.rowCount < 1) {
      throw new NotFoundError('Album tidak ditemukan');
    }
  }

  async deleteAlbumById(id) {
    const query = {
      text: `DELETE FROM ${tableName} WHERE id = $1 returning id`,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }
  }
}

module.exports = AlbumRepository;

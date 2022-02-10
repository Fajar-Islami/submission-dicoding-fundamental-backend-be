const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../pkg/error/InvariantError');
const NotFoundError = require('../pkg/error/NotFoundError');

const { mapAlbumDBToModel } = require('../helper/common');

const tableName = 'albums';

class AlbumRepository {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: `INSERT INTO ${tableName} VALUES($1,$2,$3,$4,$5) RETURNING id`,
      values: [id, name, year, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Album gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getAllAlbum() {
    const result = await this._pool.query(`SELECT * FROM ${tableName}`);
    return result.rows.map(mapAlbumDBToModel);
  }

  async getAlbumBydId(id) {
    const query = {
      text: `SELECT * FROM ${tableName} WHERE id =$1`,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    return result.rows.map(mapAlbumDBToModel)[0];
  }

  async editAlbumById(id, { name, year }) {
    const updateAt = new Date().toISOString();
    const query = {
      text: `UPDATE ${tableName} SET NAME = $1, YEAR = $2, updated_at = $3 WHERE id = $4 RETURNING id`,
      values: [name, year, updateAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
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

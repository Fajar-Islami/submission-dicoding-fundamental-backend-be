const { nanoid } = require('nanoid');
const InvariantError = require('../pkg/error/InvariantError');
const NotFoundError = require('../pkg/error/NotFoundError');

const tableName = 'songs';

class SongRepository {
  constructor(pool) {
    this._pool = pool;
  }

  async addSong(payload) {
    const {
      title, year, genre, performer, duration, albumId,
    } = payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: `INSERT INTO ${tableName} VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`,
      values: [
        id,
        title,
        year,
        genre,
        performer,
        duration,
        albumId,
        createdAt,
        updatedAt,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Song gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getAllSong() {
    const result = await this._pool.query(
      `SELECT id,title,performer FROM ${tableName}`,
    );
    return result.rows;
  }

  async getSongBydId(id) {
    const query = {
      text: `SELECT id,title,year,performer,genre,duration,album_id FROM ${tableName} WHERE id =$1`,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Song tidak ditemukan');
    }

    const fixResult = { ...result.rows[0] };

    console.log(fixResult);

    return result.rows[0];
  }

  async editSongById(id, payload) {
    const {
      title, year, genre, performer, duration, albumId,
    } = payload;
    const updateAt = new Date().toISOString();
    const query = {
      text: `UPDATE ${tableName} SET TITLE = $1, YEAR = $2, GENRE=$3, PERFORMER=$4, DURATION=$5, ALBUM_ID=$6, updated_at = $7 WHERE id = $8 RETURNING id`,
      values: [title, year, genre, performer, duration, albumId, updateAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Song tidak ditemukan');
    }
  }

  async deleteSongById(id) {
    const query = {
      text: `DELETE FROM ${tableName} WHERE id = $1 returning id`,
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Song tidak ditemukan');
    }
  }
}

module.exports = SongRepository;

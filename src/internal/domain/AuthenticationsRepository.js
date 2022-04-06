const { InvariantError } = require('../pkg/error');

const tableName = 'authentications';

class AuthenticationsRepository {
  constructor(pool) {
    this._pool = pool;
  }

  //   Menyimpan Refresh token agar access token dapat diperbarui
  async addRefreshToken(refreshToken) {
    const query = {
      text: `INSERT INTO ${tableName} VALUES ($1)`,
      values: [refreshToken],
    };

    await this._pool.query(query);
  }

  // Mengecek refresh token apakah blm kadaluarsa
  async verifyRefreshToken(token) {
    const query = {
      text: `SELECT token FROM ${tableName} WHERE token = $1`,
      values: [token],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Refresh token tidak valied');
    }
  }

  // Menghapus refresh token pada tabel authentications
  async deleteRefreshToken(token) {
    const query = {
      text: `DELETE FROM ${tableName} WHERE token = $1`,
      values: [token],
    };

    await this._pool.query(query);
  }
}

module.exports = AuthenticationsRepository;

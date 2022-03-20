const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const { InvariantError } = require('../pkg/error');

const tableName = 'users';

class UsersService {
  constructor(pool) {
    this._pool = pool;
  }

  async registerUser({ username, password, fullname }) {
    await this.verifyNewUserName(username);

    const id = `users-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();

    const query = {
      text: `INSERT INTO ${tableName} VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`,
      values: [id, username, hashedPassword, fullname, createdAt, createdAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('User gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async verifyNewUserName(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError(
        'Gagal menambahkan user. Username sudah digunakan.',
      );
    }
  }
}

module.exports = UsersService;

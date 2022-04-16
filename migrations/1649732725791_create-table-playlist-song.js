/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('playlist_songs', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notnull: true,
      references: '"playlists"',
      onDelete: 'cascade',
    },
    song_id: {
      type: 'VARCHAR(50)',
      notnull: true,
      references: '"songs"',
      onDelete: 'cascade',
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  });

  /*
    Menambahkan constraint UNIQUE, kombinasi dari kolom playlist_id dan song_id.
    Guna menghindari duplikasi data antara nilai keduanya.
  */
  pgm.addConstraint(
    'playlist_songs',
    'unique_playlist_id_and_song_id',
    'UNIQUE(playlist_id, song_id)',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('playlist_songs');
};

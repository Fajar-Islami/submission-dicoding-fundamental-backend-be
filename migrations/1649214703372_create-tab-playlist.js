/* eslint-disable camelcase */

exports.shorthands = undefined;

// https://github.com/salsita/node-pg-migrate/blob/master/docs/constraints.md
exports.up = (pgm) => {
  pgm.createTable('playlists', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    owner: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
  });

  /*
    Menambahkan constraint UNIQUE, kombinasi dari kolom note_id dan owner.
    Guna menghindari duplikasi data antara nilai keduanya.
  */
  pgm.addConstraint(
    'playlists',
    'unique_name_and_owner',
    'UNIQUE(name, owner)',
  );

  // memberikan constraint foreign key pada kolom note_id dan owner terhadap notes.id dan users.id
  pgm.addConstraint(
    'playlists',
    'fk_playlists.owner_notes.id',
    'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('playlists');
};

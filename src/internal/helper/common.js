/* eslint-disable camelcase */
const mapAlbumDBToModel = ({
  id, name, year, created_at, updated_at,
}) => ({
  id,
  name,
  year,
  createdAt: created_at,
  updatedAt: updated_at,
});

const mapSongDBToModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId,
  created_at,
  updated_at,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId,
  createdAt: created_at,
  updatedAt: updated_at,
});

const responseError = (res) => {
  const response = res.response({
    status: 'error',
    message: 'Server Error',
  });

  response.code(500);
  return response;
};

module.exports = { mapAlbumDBToModel, mapSongDBToModel, responseError };

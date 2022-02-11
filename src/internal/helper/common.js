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

const responseServerError = (res) => {
  const response = res.response({
    status: 'error',
    message: 'Server Error',
  });

  response.code(500);
  return response;
};

const responseClientError = (error, res) => {
  const response = res.response({
    status: 'fail',
    message: error.message,
  });

  response.code(error.statusCode);
  return response;
};

module.exports = {
  mapAlbumDBToModel,
  mapSongDBToModel,
  responseServerError,
  responseClientError,
};

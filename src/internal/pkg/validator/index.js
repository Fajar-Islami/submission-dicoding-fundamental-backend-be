const InvariantError = require('../error/InvariantError');
const { AlbumPayloadSchema } = require('./AlbumValidatorSchema');
const { SongPayloadSchema } = require('./SongValidatorSchema');
const { UsersPayloadSchema } = require('./UsersValidator');

const Validator = {
  validateAlbumPayload: (payload) => {
    const validationResult = AlbumPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateSongPayload: (payload) => {
    const validationResult = SongPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateUsersPayload: (payload) => {
    const validationResult = UsersPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = Validator;

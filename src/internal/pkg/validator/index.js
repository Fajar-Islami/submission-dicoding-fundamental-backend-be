const InvariantError = require('../error/InvariantError');
const { AlbumPayloadSchema } = require('./AlbumValidatorSchema');
const { SongPayloadSchema } = require('./SongValidatorSchema');
const { UsersPayloadSchema } = require('./UsersValidator');
const {
  PostAuthenticationPayloadScehma,
  PuthAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema,
} = require('./AuthenticationValidatorSchema');

const Validator = {
  //
  validateAlbumPayload: (payload) => {
    const validationResult = AlbumPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  //
  validateSongPayload: (payload) => {
    const validationResult = SongPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  //
  validateUsersPayload: (payload) => {
    const validationResult = UsersPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  //
  validatePostAuthenticationPayload: (payload) => {
    const validationResult = PostAuthenticationPayloadScehma.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validatePutAuthenticationPayload: (payload) => {
    const validationResult = PuthAuthenticationPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateDeleteAuthenticationPayload: (payload) => {
    const validationResult =
      DeleteAuthenticationPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = Validator;

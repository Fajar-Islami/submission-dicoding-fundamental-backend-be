const InvariantError = require('../error/InvariantError');
const { AlbumPayloadSchema } = require('./AlbumValidatorSchema');

const AlbumValidator = {
  validateAlbumPayload: (payload) => {
    const validationResult = AlbumPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = { AlbumValidator };

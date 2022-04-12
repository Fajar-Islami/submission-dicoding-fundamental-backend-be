class AuthenticationsHandler {
  constructor(authService, usersService, tokenManager, validator) {
    this._authService = authService;
    this._usersService = usersService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  // Ketika login
  async postAuthenticationHandler(request, h) {
    const { payload } = request;
    this._validator.validatePostAuthenticationPayload(payload);

    const { username, password } = request.payload;
    const id = await this._usersService.verifyUser({ username, password });

    // buat accessToken
    const accessToken = this._tokenManager.generateAccessToken({ id });

    // buat refreshToken
    const refreshToken = this._tokenManager.generateRefreshToken({ id });

    await this._authService.addRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'Authentication berhasil ditambahkan',
      data: {
        accessToken,
        refreshToken,
      },
    });

    response.code(201);
    return response;
  }

  async putAuthenticationHandler(request) {
    const { payload } = request;
    this._validator.validatePutAuthenticationPayload(payload);

    const { refreshToken } = request.payload;

    // Mengecek refresh token apakah blm kadaluarsa
    await this._authService.verifyRefreshToken(refreshToken);

    // // mengambil id dari token yang sudah di decode, digunakan untuk membuat accessToken baru

    const { id } = this._tokenManager.verifyRefreshToken(refreshToken);

    // membuat accessToken baru
    const accessToken = this._tokenManager.generateAccessToken({ id });

    return {
      status: 'success',
      message: 'Access Token berhasil diperbarui',
      data: {
        accessToken,
      },
    };
  }

  async deleteAuthenticationHandler(request) {
    const { payload } = request;
    this._validator.validateDeleteAuthenticationPayload(payload);

    const { refreshToken } = request.payload;
    await this._authService.verifyRefreshToken(refreshToken);

    await this._authService.deleteRefreshToken(refreshToken);

    return {
      status: 'success',
      message: 'Refresh token berhasil dihapus',
    };
  }
}

module.exports = AuthenticationsHandler;

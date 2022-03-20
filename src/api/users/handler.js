class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    const { payload } = request;
    this._validator(payload);

    const userId = await this._service.registerUser(payload);

    const response = h.response({
      status: 'success',
      data: {
        userId,
      },
    });

    response.code(201);

    return response;
  }
}

module.exports = UsersHandler;

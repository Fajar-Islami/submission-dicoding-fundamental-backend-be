const helper = require('../../internal/helper/common');
const ClientError = require('../../internal/pkg/error/ClientError');

class AlbumHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumsHandler = this.getAlbumsHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.updateAlbumHandler = this.updateAlbumHandler.bind(this);
    this.deleteAlbumHandler = this.deleteAlbumHandler.bind(this);
  }

  async postAlbumHandler(request, h) {
    try {
      this._validator.validateAlbumPayload(request.payload);
      const { name = 'default', year = 0 } = request.payload;

      const albumId = await this._service.addAlbum({ name, year });

      const response = h.response({
        status: 'success',
        data: {
          albumId,
        },
      });

      response.code(201);
      return response;
    } catch (error) {
      console.log('error', error);
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });

        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      return helper.responseError(h);
    }
  }

  async getAlbumsHandler() {
    const albums = await this._service.getAllAlbum();
    return {
      status: 'success',
      data: {
        albums,
      },
    };
  }

  async getAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const album = await this._service.getAlbumBydId(id);
      return {
        status: 'success',
        data: {
          album,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Server Error',
      });

      response.code(500);
      return response;
    }
  }

  async updateAlbumHandler(request, h) {
    try {
      this._validator.validateAlbumPayload(request.payload);
      const { id } = request.params;
      await this._service.getAlbumBydId(id);

      await this._service.editAlbumById(id, request.payload);

      return {
        status: 'success',
        message: 'Sukses update album',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });

        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      return helper.responseError(h);
    }
  }

  async deleteAlbumHandler(request, h) {
    try {
      const { id } = request.params;

      await this._service.deleteAlbumById(id);

      return {
        status: 'success',
        message: 'Sukses hapus album',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });

        response.code(error.statusCode);
        return response;
      }
    }

    // Server ERROR!
    const response = h.response({
      status: 'error',
      message: 'Server Error',
    });

    response.code(500);
    return response;
  }
}

module.exports = AlbumHandler;
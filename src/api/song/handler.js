const helper = require('../../internal/helper/common');
const ClientError = require('../../internal/pkg/error/ClientError');

class SongHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.updateSongHandler = this.updateSongHandler.bind(this);
    this.deleteSongHandler = this.deleteSongHandler.bind(this);
  }

  async postSongHandler(request, h) {
    try {
      const { payload } = request;
      this._validator(payload);

      const songId = await this._service.addSong(payload);

      const response = h.response({
        status: 'success',
        data: {
          songId,
        },
      });

      response.code(201);
      return response;
    } catch (error) {
      console.log('error', error);
      if (error instanceof ClientError) {
        return helper.responseClientError(error, h);
      }

      // Server ERROR!
      return helper.responseServerError(h);
    }
  }

  async getSongsHandler(request) {
    const songs = await this._service.getAllSong(request.query);
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const song = await this._service.getSongBydId(id);
      return {
        status: 'success',
        data: {
          song,
        },
      };
    } catch (error) {
      console.log(error);
      if (error instanceof ClientError) {
        return helper.responseClientError(error, h);
      }

      // Server ERROR!
      return helper.responseServerError(h);
    }
  }

  async updateSongHandler(request, h) {
    try {
      const { payload } = request;
      this._validator(payload);
      const { id } = request.params;
      await this._service.getSongBydId(id);

      await this._service.editSongById(id, payload);

      return {
        status: 'success',
        message: 'Sukses update song',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        return helper.responseClientError(error, h);
      }

      // Server ERROR!
      return helper.responseServerError(h);
    }
  }

  async deleteSongHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.getSongBydId(id);
      await this._service.deleteSongById(id);

      return {
        status: 'success',
        message: 'Sukses hapus song',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        return helper.responseClientError(error, h);
      }
    }

    // Server ERROR!
    return helper.responseServerError(h);
  }
}

module.exports = SongHandler;

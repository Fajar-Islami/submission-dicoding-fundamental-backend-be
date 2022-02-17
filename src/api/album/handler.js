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
    this._validator(request.payload);
    const { name, year } = request.payload;

    const albumId = await this._service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      data: {
        albumId,
      },
    });

    response.code(201);
    return response;
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
    const { id } = request.params;
    const album = await this._service.getAlbumBydId(id);
    return h.response({
      status: 'success',
      data: {
        album,
      },
    });
  }

  async updateAlbumHandler(request, h) {
    this._validator(request.payload);
    const { id } = request.params;
    await this._service.getAlbumBydId(id);

    await this._service.editAlbumById(id, request.payload);

    return h.response({
      status: 'success',
      message: 'Sukses update album',
    });
  }

  async deleteAlbumHandler(request, h) {
    const { id } = request.params;
    await this._service.getAlbumBydId(id);
    await this._service.deleteAlbumById(id);

    return h.response({
      status: 'success',
      message: 'Sukses hapus album',
    });
  }
}

module.exports = AlbumHandler;

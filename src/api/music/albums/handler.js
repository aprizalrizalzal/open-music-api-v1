const autoBind = require('auto-bind');

class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postAlbumsHandler(request, h) {
    this._validator.validateAlbumsPayload(request.payload);
    const { name = 'untitled', year } = request.payload;
    const albumId = await this._service.createAlbums({ name, year });
    const response = h.response({
      status: 'success',
      message: 'Albums berhasil ditambahkan',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  async getAlbumsByIdHandler(request) {
    const { id } = request.params;
    const album = await this._service.readAlbumsById(id);
    return {
      status: 'success',
      data: {
        album,
      },
    };
  }

  async putAlbumsByIdHandler(request) {
    this._validator.validateAlbumsPayload(request.payload);
    const { id } = request.params;
    await this._service.updateAlbumsById(id, request.payload);
    return {
      status: 'success',
      message: 'Albums berhasil diperbarui',
    };
  }

  async deleteAlbumsByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteAlbumsById(id);
    return {
      status: 'success',
      message: 'Albums berhasil dihapus',
    };
  }
}

module.exports = AlbumsHandler;

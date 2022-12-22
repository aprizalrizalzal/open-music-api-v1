require('dotenv').config();

const Hapi = require('@hapi/hapi');
const albums = require('./api/music/albums');
const AlbumsService = require('./services/postgres/music/AlbumsService');
const AlbumsValidator = require('./validator/music/albums');
const songs = require('./api/music/songs');
const SongsService = require('./services/postgres/music/SongsService');
const SongsValidator = require('./validator/music/songs');

const init = async () => {
  const albumsService = new AlbumsService();
  const songsService = new SongsService();
  const server = Hapi.Server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumsService,
        validator: AlbumsValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();

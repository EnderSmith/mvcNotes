'use strict'; // strict mode is common practice when using Hapi.js

const Hapi = require('hapi');  // dependencies
const Hoek = require('hoek');  // dependencies
const Routes = require('./lib/routes');
const Settings = require('./settings'); //dependencies
// Import the index.js file inside the models directory
const Models = require('./lib/models/');
const Path = require('path');

const server = new Hapi.Server(); // instantiate server
server.connection({ port: Settings.port }); // port is determined in settings.js

server.register([
  require('vision')
], (err) => {
  Hoek.assert(!err, err);

  // View settings
  server.views({
    engines: { pug: require('pug') },
    path: Path.join(__dirname, 'lib/views'),
    compileOptions: {
      pretty: false
    },
    isCached: Settings.env === 'production'
  });

  // Add routes
  server.route(Routes);
});

Models.sequelize.sync().then(() => {
  server.start((err) => {
    Hoek.assert(!err, err);
    console.log(`Server running at: ${server.info.uri}`); // log
  });
});

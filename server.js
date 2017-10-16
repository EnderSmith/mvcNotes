'use strict'; // strict mode is common practice when using Hapi.js

const Hapi = require('hapi');  // dependencies
const Hoek = require('hoek');  // dependencies
const Settings = require('./settings'); //dependencies

const server = new Hapi.Server(); // instantiate server
server.connection({ port: Settings.port }); // tutorial says this is connection port 3000?

server.route({ //"our first route for our server will work as a test."
  method: 'GET', // http method
  path: '/', // path requested
  handler: (request, reply) => { // arrow function is an anonymous function w/o its own this ( Node 4.0+ )
    reply('Hello, world!');
});

server.start((err) => {
  Hoek.assert(!err, err); // we use Hoek to improve our error handling

  console.log(`Server running at: ${server.info.uri}`); // log
});

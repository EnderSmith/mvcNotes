'use strict';

const Path = require('path');
const Home = require('./controllers/home');
const Note = require('./controllers/note');

module.exports = [
  // define routes here:
  {
    method: 'GET',
    path: '/',
    handler: Home,
    config: {
      description: 'Gets all the notes available'
    }
  },

  {
    method: 'POST',
    path: '/note',
    handler: Note.create,
    config: {
      description: 'Adds a new note'
    }
  },
  {
    method: 'GET',
    path: '/note/{slug}',
    handler: Note.read,
    config: {
      description: 'Gets the content of a note'
    }
  },
  {
    method: 'PUT',
    path: '/note/{slug}',
    handler: Note.update,
    config: {
      description: 'Updates the selected note'
    }
  },
  {
    // we're defining delete with a GET command, instead of delete; this way it can be called with a URL
    // this won't work with strict REST interface
    method: 'GET',
    path: '/note/{slug}/delete',
    handler: Note.delete,
    config: {
      description: 'Deletes the selected note'
    }
  },

];

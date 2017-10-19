'use strict';

const Models = require('../models/');
const Slugify = require('slug');
const Path = require('path');

module.exports = {
  // functions to handle each request in the routes.js file
  create: (request, reply) => {
    Models.Note
      .create({
        date: new Date(),
        title: request.payload.noteTitle,
        slug: Slugify(request.payload.noteTitle, {lower: true}),
        description: request.payload.noteDescription,
        content: request.payload.noteContent
      })
      .then((result) => {
        // Generate a new note with the 'result' data
      });
  },
  read: (request, reply) => {
    Models.Note
      .findOne({
        where: {
          slug: request.params.slug
        }
      })
      .then((result) => {
        reply(result);
      });
  },
  update: (request, reply) => {
    const values = {
      title: request.payload.noteTitle,
      description: request.payload.noteDescription,
      content: request.payload.noteContent
    };
    const options = {
      where: {
        slug: request.params.slug
      }
    };
    Models.Note
     .update(values, options)
     .then(() => {
       Models.Note
        .findOne(options)
        .then((result) => {
          reply(result);
        });
     });
  },
  delete: (request, reply) => {
    Models.Note
      .destroy({
        where: {
          slug: request.params.slug
        }
      })
      .then(() => reply.redirect('/'));
  },
};

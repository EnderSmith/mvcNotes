'use strict';

const Fs = require('fs'); // to read files in model folders
const Path = require('path'); // tp join the path of each file
const Sequelize = require('sequelize'); // to be instantiated
const Settings = require('../../settings'); // contains the data from settings.js

// database settings for the current envirionment
const dbSettings = Settings[Settings.env].db;

// to import all the models and make them available to our db object
const sequelize = new Sequelize(dbSettings.database, dbSettings.user, dbSettings.password, dbSettings);
const db = {};

//read all the files in this directory, and import them as models
Fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(Path.join(__dirname, file));
    db[model.name] = model;
  });

db.sequelize = sequelize;
// the second one is for convenience
db.Sequelize = Sequelize;
module.exports = db;

'use strict';

const Moment = require('moment');

module.exports = (sequelize, DataTypes) => { // accepts an instance of sequelize, and a DataTypes object with all the types
  let Note = sequelize.define('Note', {
    date: {
      type: DataTypes.DATE,
      get: function() {
        return Moment(this.getDataValue('date')).format('MMMM Do, YYYY');
      }
    },
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.STRING
  });

  return Note;
};

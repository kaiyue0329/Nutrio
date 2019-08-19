const Sequelize = require('sequelize');
const db = require('../db');

const FavoriteMeals = db.define('favoriteMeals', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = FavoriteMeals;

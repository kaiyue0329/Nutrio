const Sequelize = require('sequelize');
const db = require('../db');
const {createMeal} = require('../../neo4j/models/meals');

const Meals = db.define('meals', {
  name: {
    type: Sequelize.STRING,
    defaultValue: '', //decide later
  },
  totalCalories: {
    type: Sequelize.FLOAT,
  },
  totalCarbs: {
    type: Sequelize.FLOAT,
  },
  totalFat: {
    type: Sequelize.FLOAT,
  },
  totalProtein: {
    type: Sequelize.FLOAT,
  },
  dominantMacro: {
    type: Sequelize.STRING,
  },
  entreeType: {
    type: Sequelize.ENUM('Breakfast', 'Lunch', 'Dinner', 'Snacks'),
  },
});

Meals.beforeCreate(meal => {
  if (meal.totalFat > meal.totalCarbs && meal.totalFat > meal.totalProtein) {
    meal.dominantMacro = 'fat';
  } else if (
    meal.totalCarbs > meal.totalFat &&
    meal.totalCarbs > meal.totalProtein
  ) {
    meal.dominantMacro = 'carbs';
  } else {
    meal.dominantMacro = 'protein';
  }
});

Meals.beforeUpdate(async meal => {
  if (meal.totalFat > meal.totalCarbs && meal.totalFat > meal.totalProtein) {
    meal.dominantMacro = 'fat';
  } else if (
    meal.totalCarbs > meal.totalFat &&
    meal.totalCarbs > meal.totalProtein
  ) {
    meal.dominantMacro = 'carbs';
  } else {
    meal.dominantMacro = 'protein';
  }
  await createMeal(meal);
});

Meals.afterSave(async meal => {
  await createMeal(meal);
});

module.exports = Meals;

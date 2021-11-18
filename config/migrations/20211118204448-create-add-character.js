"use strict";
const logger = require('winston');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("Characters", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        height: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        mass: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        hair_color: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        skin_color: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        birth_year: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        gender: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        homeworld: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        url: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .catch((error) => logger.error(error));
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface
      .dropTable('Characters')
      .catch(error => logger.error(error));
  },
};

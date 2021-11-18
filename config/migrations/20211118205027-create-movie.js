"use strict";
const logger = require('winston');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("Movies", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        episode_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        opening_crawl: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        director: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        producer: {
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
    .dropTable('Movies')
    .catch(error => logger.error(error));
  },
};


const logger = require('winston');

module.exports =  {
  up(queryInterface, Sequelize) {
    return queryInterface
      .createTable('MovieCharacters', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        movieId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Movies',
            key: 'id',
          },
        },
        characterId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Characters',
            key: 'id',
          },
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
      .catch(error => logger.error(error));
  },

  down(queryInterface) {
    return queryInterface
      .dropTable('MovieCharacters')
      .catch(error => logger.error(error));
  },
};


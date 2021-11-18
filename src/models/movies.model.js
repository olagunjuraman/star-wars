const Sequelize = require('sequelize').Sequelize;
const Model = require('sequelize').Model;

/**
 * Movies Model
 *
 * @export
 * @class Movie
 * @extends {Model}
 */
class Movies extends Model {
  static modelFields = {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    episode_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    opening_crawl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    director: {
        type: Sequelize.STRING,
        allowNull: false
    },
    producer: {
        type: Sequelize.STRING,
        allowNull: false
    },

  };

  /**
   * Initializes the Movies model
   *
   * @static
   * @memberof Movies
   *
   * @param {any} sequelize the sequelize object
   *
   * @returns {object} the Movies model
   */
  static init(sequelize) {
    return super.init(Movies.modelFields, { sequelize });
  }

  /**
   * Associations for the Movie model
   *
   * @static
   * @memberof Movies
   *
   * @param {any} models the metacare api models
   *
   * @returns {null} no return
   */
   static associate(models) {
    const { Character, Comment } = models;

    Movies.hasMany(Comment, {
      foreignKey: 'movieId',
    });


    Movies.belongsToMany(Character, {
        through: 'MovieCharacters',
        foreignKey: 'movieId',
      });

  }
}

module.exports = Movies
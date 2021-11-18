const Sequelize = require('sequelize').Sequelize;
const Model = require('sequelize').Model;

/**
 * Character Model
 *
 * @export
 * @class Movie
 * @extends {Model}
 */
class Character extends Model {
  static modelFields = {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    height: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    mass: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    hair_color: {
        type: Sequelize.STRING,
        allowNull: false
    },
    skin_color: {
        type: Sequelize.STRING,
        allowNull: false
    },
    birth_year: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    homeworld: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },

  };

  /**
   * Initializes the Character model
   *
   * @static
   * @memberof Character
   *
   * @param {any} sequelize the sequelize object
   *
   * @returns {object} the Movies model
   */
  static init(sequelize) {
    return super.init(Character.modelFields, { sequelize });
  }

  /**
   * Associations for the Character model
   *
   * @static
   * @memberof Character
   *
   * @param {any} models the metacare api models
   *
   * @returns {null} no return
   */
   static associate(models) {
    const { Movies } = models;

    Character.belongsToMany(Movies, {
      through: 'MovieCharacters',
      foreignKey: 'characterId',
    });
  }
}

module.exports = Character
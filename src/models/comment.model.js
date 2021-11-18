const Sequelize = require('sequelize').Sequelize;
const Model = require('sequelize').Model;

/**
 * Comment Model
 *
 * @export
 * @class Comment
 * @extends {Model}
 */
class Comment extends Model {
  static modelFields = {
    user_ip_address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false
    },

  };

  /**
   * Initializes the Comment model
   *
   * @static
   * @memberof Movies
   *
   * @param {any} sequelize the sequelize object
   *
   * @returns {object} the Comment model
   */
  static init(sequelize) {
    return super.init(Comment.modelFields, { sequelize });
  }

  /**
   * Associations for the Comment model
   *
   * @static
   * @memberof Comment
   *
   * @param {any} models the metacare api models
   *
   * @returns {null} no return
   */
   static associate(models) {
    const { Movies } = models;

    Comment.belongsTo(Movies, {
      foreignKey: 'movieId',
    });
  }
}

module.exports = Comment
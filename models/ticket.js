'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.User, { foreignKey: 'userId' })
      Ticket.hasMany(models.WorkOrder, { foreignKey: 'ticketId' })
    }

    static async validateUserId(userId) {
      const user = await sequelize.models.User.findByPk(userId);
      if (!user) {
        throw { message: 'User with specified ID does not found', code: 400 };
      }
    }

  }
  Ticket.init({
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    client: DataTypes.STRING,
    company: DataTypes.STRING,
    trouble: DataTypes.STRING,
    status: DataTypes.STRING,
    statusLevel: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        // Custom validation using the static method
        async isValidUserId(value) {
          await Ticket.validateUserId(value);
        },
      },
    },
    createdAt: DataTypes.DATE,
    createdBy: DataTypes.STRING,
    updatedAt: DataTypes.DATE,
    updatedBy: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    deletedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WorkOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WorkOrder.belongsTo(models.Ticket, { foreignKey: 'ticketId' })
    }
  }
  WorkOrder.init({
    workOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    ticketId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    statusLevel: DataTypes.INTEGER,
    isAccepted: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    createdBy: DataTypes.STRING,
    updatedAt: DataTypes.DATE,
    updatedBy: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    deletedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'WorkOrder',
  });
  return WorkOrder;
};
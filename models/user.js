'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define association here
      User.hasMany(models.Ticket, { foreignKey: 'userId' });
    }
  }

  User.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'User name already used' },
      validate: {
        notNull: { msg: 'User name is required' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Email already used' },
      validate: {
        notNull: { msg: 'Email is required' },
        isEmail: { msg: 'Invalid Email' },
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    updatedBy: {
      type: DataTypes.STRING,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
    deletedBy: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};

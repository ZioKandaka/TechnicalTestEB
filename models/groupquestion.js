'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GroupQuestion extends Model {
    static associate(models) {
      // Add associations if needed
    }
  }

  GroupQuestion.init({
    group_question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ordering: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      question: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      line_of_business_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      group_question_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      question_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      list: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_shareable: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      math_operator_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      dependency_value: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at', // Specify snake_case field name
      },
      created_by: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'created_by', // Specify snake_case field name
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated_at', // Specify snake_case field name
      },
      updated_by: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'updated_by', // Specify snake_case field name
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'deleted_at', // Specify snake_case field name
      },
      deleted_by: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'deleted_by', // Specify snake_case field name
      },
      is_vendor: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      is_internal: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      is_colo: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      is_renewal: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lob_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
  }, {
    sequelize,
    modelName: 'GroupQuestion',
    tableName: 'group_question', // Optional: Set the table name explicitly
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: 'deleted_at',
  });

  return GroupQuestion;
};

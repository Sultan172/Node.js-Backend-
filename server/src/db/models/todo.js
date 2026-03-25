'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Todo',
    }
  );
  return Todo;
};

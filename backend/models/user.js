'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      
    }
  }
  User.init({
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    user: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    permission: DataTypes.BOOLEAN,
    profile_picture_url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
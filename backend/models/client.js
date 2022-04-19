'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    static associate(models) {
    }
  }
  Client.init({
    name: DataTypes.STRING,
    cif: DataTypes.STRING,
    street: DataTypes.STRING,
    street_number: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    id_budget: DataTypes.STRING,
    budget_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Budget extends Model {
    static associate(models) {
    }
  }
  Budget.init({
    id: DataTypes.STRING,
    creation_date: DataTypes.STRING,
    budget_number: DataTypes.STRING,
    total_costs: DataTypes.DOUBLE,
    photographic_production: DataTypes.DOUBLE,
    agency_fee: DataTypes.DOUBLE,
    total_budget: DataTypes.DOUBLE,
    expiration_date: DataTypes.STRING,
    iban: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Budget',
  });
  return Budget;
};
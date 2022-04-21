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
    status: DataTypes.STRING,
    total_costs: DataTypes.STRING,
    photographic_production: DataTypes.STRING,
    agency_fee: DataTypes.STRING,
    total_budget: DataTypes.STRING,
    expiration_date: DataTypes.STRING,
    iban: DataTypes.STRING,
    user: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Budget',
  });
  return Budget;
};
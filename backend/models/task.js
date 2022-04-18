'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
    }
  }
  Task.init({
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    days_number: DataTypes.INTEGER,
    day_price: DataTypes.DOUBLE,
    cost: DataTypes.DOUBLE,
    supplier: DataTypes.STRING,
    invoice_number: DataTypes.STRING,
    expiration_date: DataTypes.STRING,
    payment_method: DataTypes.STRING,
    payment_date: DataTypes.STRING,
    id_budget: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ImageRights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ImageRights.init({
    id: DataTypes.INTEGER,
    id_budget: DataTypes.STRING,
    budget_number: DataTypes.STRING,
    client_cif: DataTypes.STRING,
    status: DataTypes.STRING,
    agency_name: DataTypes.STRING,
    model_name: DataTypes.STRING,
    campaign: DataTypes.STRING,
    rights_duration: DataTypes.STRING,
    campaign_start_date: DataTypes.STRING,
    campaign_end_date: DataTypes.STRING,
    invoice_number: DataTypes.STRING,
    rights_amount: DataTypes.STRING,
    rights_renewal_amount: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ImageRights',
  });
  return ImageRights;
};
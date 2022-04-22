'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ImageRights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_budget: {
        type: Sequelize.STRING
      },
      budget_number: {
        type: Sequelize.STRING
      },
      client_cif: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      agency_name: {
        type: Sequelize.STRING
      },
      model_name: {
        type: Sequelize.STRING
      },
      campaign: {
        type: Sequelize.STRING
      },
      rights_duration: {
        type: Sequelize.STRING
      },
      campaign_start_date: {
        type: Sequelize.STRING
      },
      campaign_end_date: {
        type: Sequelize.STRING
      },
      invoice_number: {
        type: Sequelize.STRING
      },
      rights_amount: {
        type: Sequelize.STRING
      },
      rights_renewal_amount: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ImageRights');
  }
};
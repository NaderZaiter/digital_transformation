'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Budgets', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      creation_date: {
        allowNull: true,
        type: Sequelize.STRING
      },
      budget_number: {
        allowNull: true,
        type: Sequelize.STRING
      },
      total_costs: {
        allowNull: true,
        type: Sequelize.DOUBLE
      },
      photographic_production: {
        allowNull: true,
        type: Sequelize.DOUBLE
      },
      agency_fee: {
        allowNull: true,
        type: Sequelize.DOUBLE
      },
      total_budget: {
        allowNull: true,
        type: Sequelize.DOUBLE
      },
      expiration_date: {
        allowNull: true,
        type: Sequelize.STRING
      },
      iban: {
        allowNull: true,
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Budgets');
  }
};
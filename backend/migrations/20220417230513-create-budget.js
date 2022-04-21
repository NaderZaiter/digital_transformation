'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Budgets', {
      id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      creation_date: {
        allowNull: true,
        type: Sequelize.STRING
      },
      budget_number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: true,
        type: Sequelize.STRING
      },
      total_costs: {
        allowNull: true,
        type: Sequelize.STRING
      },
      photographic_production: {
        allowNull: true,
        type: Sequelize.STRING
      },
      agency_fee: {
        allowNull: true,
        type: Sequelize.STRING
      },
      total_budget: {
        allowNull: true,
        type: Sequelize.STRING
      },
      expiration_date: {
        allowNull: true,
        type: Sequelize.STRING
      },
      iban: {
        allowNull: true,
        type: Sequelize.STRING
      },
      user: {
        allowNull: false,
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Budgets');
  }
};
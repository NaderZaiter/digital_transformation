'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      description: {
        allowNull: true,
        type: Sequelize.STRING
      },
      category: {
        allowNull: true,
        type: Sequelize.STRING
      },
      days_number: {
        allowNull: true,
        type: Sequelize.STRING
      },
      day_price: {
        allowNull: true,
        type: Sequelize.STRING
      },
      total_price: {
        allowNull: true,
        type: Sequelize.STRING
      },
      cost: {
        allowNull: true,
        type: Sequelize.STRING
      },
      supplier: {
        allowNull: true,
        type: Sequelize.STRING
      },
      invoice_number: {
        allowNull: true,
        type: Sequelize.STRING
      },
      expiration_date: {
        allowNull: true,
        type: Sequelize.STRING
      },
      payment_method: {
        allowNull: true,
        type: Sequelize.STRING
      },
      payment_date: {
        allowNull: true,
        type: Sequelize.STRING
      },
      id_budget: {
        allowNull: false,
        type: Sequelize.STRING
      },
      budget_number: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};
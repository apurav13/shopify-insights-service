'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      tenantId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      shopifyOrderId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      totalPrice: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      orderDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      customerId: {
        type: Sequelize.UUID,
        references: { model: 'Customers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};

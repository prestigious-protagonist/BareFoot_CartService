'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cartItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shoevariantsId: {
        type: Sequelize.UUID,
        allowNull: false,
        
      },
      cartId:{
        type: Sequelize.UUID,
        references:{
          model: 'carts',
          key: 'id'
        },
        allowNull: false
      },
      data:{
        type: Sequelize.JSON,
        allowNull: false
      },quantity:{
        defaultValue: 1,
        type: Sequelize.INTEGER,
        validate:{
          min: 1
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cartItems');
  }
};
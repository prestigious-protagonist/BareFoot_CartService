'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    static associate(models) {
      // Associate cart with cartItems using cartId
      cart.hasMany(models.cartItems, {
        foreignKey: 'cartId',
        sourceKey: 'id',
      });
    }
  }

  cart.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'cart',
  });

  return cart;
};

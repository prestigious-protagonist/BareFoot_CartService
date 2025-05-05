'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cartItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cartItems.belongsTo(models.cart, {
        foreignKey: 'cartId',
        targetKey: 'id',
      });
    }
  }
  cartItems.init({
    shoevariantsId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    cartId:{
      type: DataTypes.UUID,
      references:{
        model: 'carts',
        key: 'id'
      },
      unique: true
    },quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate:{
        min: 1
      }
    }
    , data:{
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'cartItems',
  });
  return cartItems;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favourites extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  favourites.init({
    shoeId: {
      type:DataTypes.UUID,
      allowNull: false,
      references:{
        model: "cart",
        key: "userId"
      }
    },
    userId: {
      type:DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'favourites',
  });
  return favourites;
};
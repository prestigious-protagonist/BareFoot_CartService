
const { Op } = require("sequelize");
const {cart, cartItems} = require("../models/index");
const {v4: uuid4} = require("uuid");
const { PRODUCT_SERVICE_BASE_URL } = require("../config/server-config");
class CartRepository {
    async checkCart(userId, options) {
        try {
            const checkCart = await cart.findOne({
                where:{
                    userId
                }
            }, options);
            return checkCart?.id;

        } catch (error) {
            throw error
        }
    }
    async createCart(userId, options) {
        try {
            const newCart = await cart.create({

                    id: uuid4(),
                    userId: userId

            }, options);
            return newCart

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async create({variantId, cartId, productData}, options) {
        try {
            const data = await cartItems.create({
               
                    cartId,
                    shoevariantsId: variantId,
                    data: productData
                
            }, options);
            return data

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async getItems(cartId, options) {
        try {
            const data = await cartItems.findAll({
               
                cartId
                
            }, options);
            return data

        } catch (error) {
            console.log(error)
            throw error
        }
    }
    async prodExists(variantId, cartId,options = {}) {
        try {
          //also check cartId should match
          const data = await cartItems.findOne(
            { where:{shoevariantsId: variantId, cartId: cartId,} },
            options
          );
          return data;
        } catch (error) {
          console.error('Error in prodExists:', error);
          throw error;
        }
      }
    
      async clearCart(cartId, options ) {
        try {
          const data = await cartItems.destroy({
            where:{
                cartId
            }
          },
            
            options
          );
          return true;
        } catch (error) {
          console.error('Error in prodExists:', error);
          throw error;
        }
      }
      async getCartIdByUserId(userId, options ) {
        try {
          const data = await cart.findOne({
            where:{
                userId
            }
          }, options)
          return data;
        } catch (error) {
          throw error;
        }
      }
      async updateItem(data, options ) {
        try {
          console.log("HERE")
          const product = await cartItems.findOne({
            where:{
                shoevariantsId: data.shoeVariantsId
            }
          }, options)
          console.log(product)
          product.quantity = data.quantity
          await product.save()
          return product;
        } catch (error) {
          throw error;
        }
      }

      async deleteItem(data, options ) {
        try {
          const product = await cartItems.destroy({
            where:{
                id: data.id
            }
          }, options)
          return true;
        } catch (error) {
          throw error;
        }
      }
      async getShoeById(shoeId, options ) {
        try {
          const exists = await axios.get(`${PRODUCT_SERVICE_BASE_URL}/api/user/get-by-Id/${shoeId}`)
          return exists;
        } catch (error) {
          throw error;
        }
      }
}
module.exports = CartRepository;
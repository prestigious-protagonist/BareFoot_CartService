const { UUIDV4 } = require("sequelize");
const CartRepository = require("../repository/cart-repository");
const { v4: uuidv4 } = require('uuid');
const ClientError = require("../utils/errorHandlers/ClientError");
const AppError = require("../utils/errorHandlers/AppError");
const ValidationError = require("../utils/errorHandlers/ValidationError");
class CartService {
    constructor() {
        this.CartRepository = new CartRepository();
        
    }
    async create({variantId, userId, productData}, options) {
        try {
            let cartId;
             //check if user has a cart id
            const cart = await this.CartRepository.checkCart(userId, options);
            if(cart == null) {
                console.log("HERERERERERERERERERER")
            
                const newCart = await this.CartRepository.createCart(userId, options);
                cartId = newCart.id
            }else{
                
                cartId = cart.id;
            }
            console.log("Cart id is "+ cartId)
            //look if product already exists in cart
            const prodExists = await this.CartRepository.prodExists(variantId, options);
            console.log("OPOPO")
            console.log(variantId)
            console.log(prodExists?.dataValues?.shoevariantsId)
            if(prodExists?.dataValues?.shoevariantsId) {
                throw new ClientError({
                    name: "DuplicateResource",
                    message: "Cart already has this item",
                    explanation: "already added to cart",
                })
            }
            const item = await this.CartRepository.create({variantId, cartId, productData}, options);
            if(!item) throw new AppError({
                        message: "couldn't add to cart"
                    })
            return item
        } catch (error) {
            console.log(error)
            if(error.name == 'SequelizeValidationError' ) {
                throw new ValidationError({
                    name: error.name,
                    message:  error?.errors[0]?.message,
                    explanation: error?.errors[0]?.type  
                })
            }
            throw error;
        }
    }

    async getItems(userId, options) {
        try {
            //find in cart
            const cart = await this.CartRepository.checkCart(userId, options);
            // if(cart == null) {
            //     console.log("HERERERERERERERERERER")
            
            //     throw new ClientError({
            //         name: "RESOURCE_NOTFOUND",
            //         message: "Cart empty",
            //         explanation: "nothing to show",
            //     })
            // }
            let cartId = cart?.id 
            if(!cartId) return
            const cartItems = await this.CartRepository.getItems(cartId, options)

            return cartItems
        } catch (error) {
            if(error.name == 'SequelizeValidationError' ) {
                throw new ValidationError({
                    name: error.name,
                    message:  error?.errors[0]?.message,
                    explanation: error?.errors[0]?.type  
                })
            }
            throw error;
        }
    }
    

    async clearCart(userId, options) {
        try {
            const cartId = await this.CartRepository.getCartIdByUserId(userId, options)
            console.log(":OOOOOOOOOOOOOOOOOOOOOOOOOOOO")
            console.log("cart id is : "+JSON.stringify(cartId))
            if(!cartId.userId) throw new AppError()
            
            const cartItems = await this.CartRepository.clearCart(cartId.id, options)

            return cartItems
        } catch (error) {
            if(error.name == 'SequelizeValidationError' ) {
                throw new ValidationError({
                    name: error.name,
                    message:  error?.errors[0]?.message,
                    explanation: error?.errors[0]?.type  
          
                })
            }
            throw error;
        }
    }
    
    async updateItem(data, options) {
        try {
            const cartId = await this.CartRepository.getCartIdByUserId(data.userId, options)
            console.log("cart id is : "+JSON.stringify(cartId))
            if(!cartId.userId) throw new AppError()
            
            const cartItems = await this.CartRepository.updateItem(data, options)

            return cartItems
        } catch (error) {
            if(error.name == 'SequelizeValidationError' ) {
                throw new ValidationError({
                    name: error.name,
                    message:  error?.errors[0]?.message,
                    explanation: error?.errors[0]?.type  
                })
            }
            throw error;
        }
    }

    async deleteItem(data, options) {
        try {
            
            const product = await this.CartRepository.deleteItem(data, options)
            if(!product) {
                throw new AppError()
            }
            return product
        } catch (error) {
            if(error.name == 'SequelizeValidationError' ) {
                throw new ValidationError({
                    name: error.name,
                    message:  error?.errors[0]?.message,
                    explanation: error?.errors[0]?.type  
                })
            }
            throw error;
        }
    }

   
}

module.exports = CartService;
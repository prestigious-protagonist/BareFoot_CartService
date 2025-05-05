const CartService = require("../service/cart-service");
this.CartService = new CartService();
const {sequelize} = require("../models/index");
const ValidationError = require("../utils/errorHandlers/ValidationError");
const AppError = require("../utils/errorHandlers/AppError");

const create = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        
        const data = {
            variantId: req.body.variantId,
            userId: req.headers["x-user-id"],
            productData: req.productData
        }
        console.log(req.productData)
        const product = await this.CartService.create(data, {transaction});
        await transaction.commit();
        res.status(201).json({
            success: true,
            status: 201,
            message: "Successfully added the product",
            data:[product]
        })
    } catch (error) {

        console.log("Error is "+error)
        await transaction.rollback();
        if (error instanceof ValidationError) {
            return res.status(error.statusCode).json({
                name: error.name,
                status: error.statusCode,
                success: false,
                message: error.message,
                explanation: error.explanation,
            });
        }
        if (error instanceof AppError || (error.name  && error.message && error.explanation)) {
            return res.status(error.statusCode).json({
                name: error.name,
                status: error.statusCode,
                success: false,
                message: error.message,
                explanation: error.explanation,
            });
        }
        
        
        res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong"
        })
    }
}

const getItems = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        
       
        const product = await this.CartService.getItems(req.headers["x-user-id"], {transaction});
        await transaction.commit();
        res.status(200).json({
            success: true,
            status: 200,
            message: "Successfully fetched the cart Items",
            data:[product]
        })
    } catch (error) {

        console.log("Error is "+error)
        await transaction.rollback();
        if (error instanceof ValidationError) {
            return res.status(error.statusCode).json({
                name: error.name,
                status: error.statusCode,
                success: false,
                message: error.message,
                explanation: error.explanation,
            });
        }
        if (error instanceof AppError || (error.name  && error.message && error.explanation)) {
            return res.status(error.statusCode).json({
                name: error.name,
                status: error.statusCode,
                success: false,
                message: error.message,
                explanation: error.explanation,
            });
        }
        
        
        res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong"
        })
    }
}



const clearCart = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        
       
        const product = await this.CartService.clearCart(req.headers["x-user-id"], {transaction});
        await transaction.commit();
        res.status(200).json({
            success: true,
            status: 200,
            message: "Successfully deleted the cart Items",
            data:[product]
        })
    } catch (error) {

        console.log("Error is "+error)
        await transaction.rollback();
        if (error instanceof ValidationError) {
            return res.status(error.statusCode).json({
                name: error.name,
                status: error.statusCode,
                success: false,
                message: error.message,
                explanation: error.explanation,
            });
        }
        if (error instanceof AppError || (error.name  && error.message && error.explanation)) {
            return res.status(error.statusCode).json({
                name: error.name,
                status: error.statusCode,
                success: false,
                message: error.message,
                explanation: error.explanation,
            });
        }
        
        
        res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong"
        })
    }
}




const updateItem = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        
        const data = {
            userId: req.headers["x-user-id"],
            quantity: req.body.quantity,
            shoeVariantsId: req.body.id
        }
        console.log(data)
        const product = await this.CartService.updateItem(data, {transaction});
        await transaction.commit();
        res.status(200).json({
            success: true,
            status: 200,
            message: "Successfully updated the cart Items",
            data:[product]
        })
    } catch (error) {

        console.log("Error is "+error)
        await transaction.rollback();
        if (error instanceof ValidationError) {
            return res.status(error.statusCode).json({
                name: error.name,
                status: error.statusCode,
                success: false,
                message: error.message,
                explanation: error.explanation,
            });
        }
        if (error instanceof AppError || (error.name  && error.message && error.explanation)) {
            return res.status(error.statusCode).json({
                name: error.name,
                status: error.statusCode,
                success: false,
                message: error.message,
                explanation: error.explanation,
            });
        }
        
        
        res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong"
        })
    }
}




const deleteItem = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        
        const data = {
            userId: req.headers["x-user-id"],
            id: req.params.variantsId
        }
        console.log(data)
        const product = await this.CartService.deleteItem(data, {transaction});
        await transaction.commit();
        res.status(200).json({
            success: true,
            status: 200,
            message: "Successfully updated the cart Items",
            data:[product]
        })
    } catch (error) {

        console.log("Error is "+error)
        await transaction.rollback();
        if (error instanceof ValidationError) {
            return res.status(error.statusCode).json({
                name: error.name,
                status: error.statusCode,
                success: false,
                message: error.message,
                explanation: error.explanation,
            });
        }
        if (error instanceof AppError || (error.name  && error.message && error.explanation)) {
            return res.status(error.statusCode).json({
                name: error.name,
                status: error.statusCode,
                success: false,
                message: error.message,
                explanation: error.explanation,
            });
        }
        
        
        res.status(500).json({
            success: false,
            status: 500,
            message: "Something went wrong"
        })
    }
}

module.exports = {
   create,
   getItems,
   clearCart,
   updateItem,
   deleteItem,
}
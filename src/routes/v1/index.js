const express = require("express")
const router = express.Router()
const CartController = require("../../controller/cart-controller")
const axios = require("axios")
const { PRODUCT_SERVICE_BASE_URL } = require("../../config/server-config")
router.post('/addProduct',async (req, res, next) => {
    const {variantId} = req.body
    try {
        console.log("((((((((((((((((( "+variantId)
        const response = await axios.get(`${PRODUCT_SERVICE_BASE_URL}/api/user/get-by-variantId/${variantId}`, {
            headers: {
                authorization: req.headers["authorization"],
            },
        });
        console.log(response.data.data)
        req.productData = response.data.data
        next()
    } catch (error) {
        console.log(error)
        next(error.response.data)
       
    }
    
    
}
 ,CartController.create)
router.get('/', (req, res) => {
    res.send("HIOP")
})


router.get('/cartItems', CartController.getItems)
router.get('/', (req, res) => {
    res.send("HIOP")
})


router.delete('/clearCart', CartController.clearCart)
router.delete('/deleteCartItem/:variantsId', CartController.deleteItem)
router.patch('/updateCartItem', CartController.updateItem)

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        name: err.name,
        success: false,
        message: err.message || "Internal Server Error",
        explanation: err.explanation,

    });
});

module.exports = router


require("dotenv").config()
module.exports = {
    PORT: process.env.PORT,
    JWKSURI: process.env.JWKSURI,
    ISSUER: process.env.ISSUER,
    AUDIENCE: process.env.AUDIENCE,
    PRODUCT_SERVICE_BASE_URL: process.env.PRODUCT_SERVICE_BASE_URL,
    
    
}
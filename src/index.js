const express = require("express") 
const { PORT } = require("./config/server-config")
const apiRouter = require("./routes/index")
const bodyParser = require("body-parser")
const cors = require("cors")
const startServer = () => {
    const app = express();

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.get('/cartService/api', (req, res) => {
        res.send("HILK")
    } )
    app.use('/cartService/api', apiRouter)
    app.use(cors({
            origin: 'http://localhost:5173'
        }))
    
    app.listen(PORT, () => {
        console.log("Server listening on PORT : "+PORT)
    })
}   

startServer()
const express = require("express")
const app = express()
const productosApi = require(`./api/productos.js`)
const cart = require(`./api/cart.js`)

const PORT = process.env.PORT || 8080
const servidor = app.listen(8080, ()=> console.log(`hola ` + PORT))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/api/productos', productosApi)
app.use('/api/cart', cart)
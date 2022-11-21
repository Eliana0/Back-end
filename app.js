const express = require("express")
const app = express()
const productosApi = require(`./api/productos.js`)

const servidor = app.listen(8080, ()=> console.log("hola"))

app.use(express.json())
app.use('/api', express.static("public"))
app.use('/api/productos', productosApi)

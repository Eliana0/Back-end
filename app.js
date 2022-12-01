const express = require("express")
const app = express()
const handlebars = require('express-handlebars')
const { Server } = require("socket.io")

const PORT = process.env.PORT || 8080
const servidor = app.listen(PORT, ()=> console.log(`hola ${PORT}`))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('./views'))

const io = new Server(servidor)

const productos = []

app.engine('handlebars', handlebars.engine())
app.set("views", "./views");
app.set("view engine", "handlebars"); 

io.on('connection', (socket) => {
    console.log("Usuario conectado")
    socket.on(`c`, data => {
        productos.push(data)
        io.emit(`mensaje`, productos)
    })
    socket.on(`usuario registrado`, data => {
        socket.broadcast.emit("elemento", data)
    })
})

app.get('/', (req, res) => {
    res.render(`home`, {
        productos: productos
    })
})

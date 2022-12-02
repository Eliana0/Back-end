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

const chat = []
const productos = []

app.engine('handlebars', handlebars.engine())
app.set("views", "./views");
app.set("view engine", "handlebars"); 

io.on('connection', (socket) => {
    socket.on(`c`, data => {
        chat.push(data)
        io.emit(`mensaje`, chat)
    })
    socket.on(`usuario registrado`, data => {
        socket.broadcast.emit("elemento", data)
    })
    socket.on("objeto", data => {
        productos.push(data)
        io.emit("menu", productos)
    })
    io.emit(`mensaje`, chat)
    io.emit("menu", productos)
})

app.get('/', (req, res) => {
    res.render(`home`, {
        productos: productos
    })
})

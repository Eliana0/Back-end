const express = require("express")
const app = express()
const handlebars = require('express-handlebars')
const pug = require('pug')

const servidor = app.listen(8080, ()=> console.log("hola"))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const productos = []

app.engine('handlebars', handlebars.engine())
app.set("views", "./views");
app.set("view engine", "pug");

app.get('/formulario', (req, res) => {
    res.render(`form`)
})

app.post("/formulario", (req, res) => {
    productos.push(req.body)
    res.redirect('/formulario')
    res.send(req.body)
})

app.get('/productos', (req, res) => {
    res.render('home', {
        productos: productos
    })
})

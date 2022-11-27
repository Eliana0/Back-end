const express = require("express")
const app = express()
const handlebars = require('express-handlebars')

const servidor = app.listen(8080, ()=> console.log("hola"))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const productos = []

app.engine('handlebars', handlebars.engine())
app.set("views", "./views");
app.set("view engine", "handlebars");

app.get('/formulario', (req, res) => {
    res.render(`home`)
})

app.post("/formulario", (req, res) => {
    elementos= req.body
    if (elementos.nombre && elementos.foto && elementos.precio){
        productos.push(req.body)
        res.redirect('/formulario')
        res.send(req.body)
    }else{
        res.send("Por favor, ingrese todos los datos")
    }
})

app.get('/menu', (req, res) => {
    res.render('menu', {
        productos: productos
    })
})

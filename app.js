const express = require("express")
const app = express()
const multer = require("multer")
const productosApi = require(`./api/productos.js`)
const fs = require('fs')

const handlebars = require('express-handlebars')

const servidor = app.listen(8080, ()=> console.log("hola"))

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/img")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})


app.engine('handlebars', handlebars.engine())
app.set(`views`, `./views`)
app.set(`view engine`, `handlebars`)

let productos = [
    {
        nombre: "Eliana",
        apellido: "Cristaldo",
        telefono: 123456,
        mail: "jajaja@gmail.com"
    },
    {
        nombre: "Hermione",
        apellido: "Granger",
        telefono: 123456,
        mail: "hermione@gmail.com" 
    },
    {
        nombre: "Harry",
        apellido: "Potter",
        telefono: 123456,
        mail: "elniñoquevivio@gmail.com" 
    }
]

app.get("/productos", (req, res) => {
    res.render('productos', {
        productos: productos
    })
})

app.use(express.json())
app.use('/api', express.static("public"))
app.use('/api/productos', productosApi)

let descargaImg = multer({storage})

app.post('/api/descarga', descargaImg.single('archivo'), (req, res) => {
    res.send({message: 'ok'})
})
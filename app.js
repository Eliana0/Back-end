const express = require("express")
const app = express()
const multer = require("multer")

const servidor = app.listen(8080, ()=> console.log("hola"))

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/img")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const productos = []

app.set("views", "./views");
app.set("view engine", "ejs");

app.get('/formulario', (req, res) => {
    res.render('cargado', {
        productos
    })
})

app.post("/cargado", (req, res) => {
    productos.push(req.body)
    res.redirect('/formulario')
    res.send(req.body)
})

app.get('/menu', (req, res) => {
    res.render('productos', {
        productos: productos
    })
})
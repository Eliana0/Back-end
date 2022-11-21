const express = require("express")
const app = express()
const multer = require("multer")
const productosApi = require(`./api/productos.js`)

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
app.use('/api', express.static("public"))
app.use('/api/productos', productosApi)

let descargaImg = multer({storage})

app.post('/api/descarga', descargaImg.single('archivo'), (req, res) => {
    res.send({message: 'ok'})
})
const express = require("express");
const rutaProductos = require(`./api/productos`);
const rutaProductosID = require(`./api/productosID`);

const app = express();

const server = app.listen(8080, () => console.log(`hola`));

app.use(express.json())
app.use(express.static(`public`))
app.use(`/api/productos`, rutaProductos);
app.use(`/api/productos/:id`, rutaProductosID);
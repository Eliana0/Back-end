const fs = require('fs');
const { stringify } = require('querystring');
const carrito = `./cart.txt`
const productos = `./productos.txt`

class ContentCart {
    CreateCart = async(cart) => {
        try{
            if(fs.existsSync(carrito)){
                let read = JSON.parse(await fs.promises.readFile(carrito, 'utf-8'));
                let newObj = read[read.length-1].id+1;
                cart.id= newObj;
                read.push(cart);
                await fs.promises.writeFile(carrito, JSON.stringify(read, null, 2));
                return {status: "sucess", message: "nuevo producto agregado al menu"}
            }else{
                cart.id = 1
                await fs.promises.writeFile(carrito, JSON.stringify([cart], null, 2))
                return {status: "sucess", message: "Nuevo producto"}
            }
        }catch(err){
            return {status: "error", message: err.message}
        }
    }
    deleteCart = async(Number) => {
        if(fs.existsSync(carrito)){
        let read = JSON.parse(await fs.promises.readFile(carrito, `utf-8`));
        let encuentraId = read.findIndex(e => e.id == Number);
            read.splice(encuentraId, 1);
            try{
                fs.writeFileSync(carrito, JSON.stringify(read));
                return Number
            }
            catch(err){
                return {status: "error", message: err.message};
            }
        } else {
            return {message: "No se ha encontrado el elemento"} 
        }   
    }
    getCartById = async(number) => {
        if(fs.existsSync(carrito)){
            let read = JSON.parse(await fs.promises.readFile(carrito, `utf-8`));
            let encuentraId = read.find(e => e.id == number)
            let encuentraProducto = encuentraId.productos
            return encuentraProducto
        }else {
            return {message: "No se ha encontrado el elemento"} 
        }
    }
    postById = async(number, archivo) => {
        if(fs.existsSync(carrito)){
            let read = JSON.parse(await fs.promises.readFile(carrito, `utf-8`));
            let encuentraId = read.find(e => e.id == number)
            let encuentraProducto = encuentraId.productos
            encuentraProducto.push(archivo)
            await fs.promises.writeFile(carrito, JSON.stringify(read, null, 2));
            return {status: "sucess", message: "nuevo producto agregado al carrito"}
        }else {
            return {message: "No se ha encontrado el elemento"} 
        }
    }
    deleteElement = async(number, numberProd) => {
        if(fs.existsSync(carrito)){
            let read = JSON.parse(await fs.promises.readFile(carrito, `utf-8`));
            let encuentraId = read.find(e => e.id == number)
            let encuentraProducto = encuentraId.productos
            let encuentraIdProducto = encuentraProducto.findIndex(e => e.id == numberProd)
            if(encuentraIdProducto !== -1){
                encuentraProducto.splice(encuentraIdProducto, 1);
                console.log(read)
                try{
                    fs.writeFileSync(carrito, JSON.stringify(read));
                    return numberProd
                }
                catch(err){
                    return {status: "error", message: err.message};
                }
            }else{
                return {message: `El id ingresado no corresponde a un producto del carrito ${number}`}
            }
        }
    }
}

module.exports = ContentCart
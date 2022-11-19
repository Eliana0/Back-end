const fs = require('fs');
const { stringify } = require('querystring');
const menu = './productos.txt'

class Contenedor {
    Save = async(archivo) => {
        try{
            if(fs.existsSync(menu)){
                let read = JSON.parse(await fs.promises.readFile(menu, 'utf-8'));
                let newObj = read[read.length-1].id+1;
                archivo.id= newObj;
                read.push(archivo);
                await fs.promises.writeFile(menu, JSON.stringify(read, null, 2));
                return {status: "sucess", message: "nuevo producto agregado al menu"}
            }else{
                archivo.id = 1
                await fs.promises.writeFile(menu, JSON.stringify([archivo], null, 2))
                return {status: "sucess", message: "Nuevo producto"}
            }
        }catch(err){
            return {status: "error", message: err.message}
        }
    }
    getAll = async() => {
        if(fs.existsSync(menu)){
            let read = JSON.parse(await fs.promises.readFile(menu, 'utf-8'));
            return read
        }else {
            return "No se ha encontrado archivos"
        }
    }    
    getById = async(Number) => {
        if(fs.existsSync(menu)){
            let read = JSON.parse(await fs.promises.readFile(menu, 'utf-8'));
            let encuentraId = read.find(obj => obj.id === Number)
            return encuentraId
        }else {
            return "No se ha encontrado el elemento"
        }
    }
    actualizaById = async(id) => {
        let read = JSON.parse(await fs.promises.readFile(menu, 'utf-8'));
        let index = read.findIndex(product => product.id == id);
           if(index >= 0){
               read[index] = product;
               this.write(read, file);
               console.log('Actualizado');
           }else{
               console.log('No se encontro el producto');
           }
    }
    deleteById = async(Number, archivo) => {
        let read = JSON.parse(await fs.promises.readFile(menu, 'utf-8'));
        let encuentraId = read.findIndex(e => e.id == Number);
        if(encuentraId){
            read.splice(encuentraId, 1);
            let json = JSON.stringify(read);
            try{
                fs.writeFileSync(archivo, json);
                return Number
            }
            catch(err){
                console.log('Error en la escritura', err);
            }
        }
    }
}
module.exports = Contenedor
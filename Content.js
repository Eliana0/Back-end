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
            return {message: "No se ha encontrado el elemento"}
        }
    }    
    getById = async(Number) => {
        if(fs.existsSync(menu)){
            let read = JSON.parse(await fs.promises.readFile(menu, 'utf-8'));
            let encuentraId = read.find(e => e.id == Number)
            return encuentraId
        }else {
            return {message: "No se ha encontrado el elemento"} 
        }
    }
    actualizaById = async(Number, product, archivo) => {
        if(fs.existsSync(menu)){
        let read = JSON.parse(await fs.promises.readFile(menu, 'utf-8'));
         let encuentraId = read.findIndex(e => e.id == Number);
                read[encuentraId] = product;
                fs.writeFileSync(archivo, JSON.stringify(read));
                return {message: "producto actualizado"};
        }else {
            return {message: "No se ha actualizado el elemento"} 
        }
    }
    deleteById = async(Number, archivo) => {
        if(fs.existsSync(menu)){
        let read = JSON.parse(await fs.promises.readFile(menu, `utf-8`));
        let encuentraId = read.findIndex(e => e.id == Number);
            read.splice(encuentraId, 1);
            try{
                fs.writeFileSync(archivo, JSON.stringify(read));
                return Number
            }
            catch(err){
                return {status: "error", message: err.message};
            }
        } else {
            return {message: "No se ha encontrado el elemento"} 
        }   
    }
}

module.exports = Contenedor
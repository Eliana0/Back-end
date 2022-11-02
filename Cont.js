const fs = require('fs')
const menu = './menu.json'

class Contenedor {
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
            console.log(encuentraId)
        }else {
            console.log("No se ha encontrado el elemento")
        }
    }
    productoRandom = async() => {
        if(fs.existsSync(menu)){
            let read = JSON.parse(await fs.promises.readFile(menu, 'utf-8'));
            let max= read.map(obj => obj.id)
            let encuentraId = read.find(obj => obj.id === parseInt(Math.random()*(Math.max(...max))));
            return encuentraId
        }else {
        return "No se ha encontrado el elemento"
    }
    }
}
module.exports = Contenedor
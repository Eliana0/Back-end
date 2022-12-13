const options = require(`./options/mysql.config.js`);
const knex = require(`knex`);

const database = knex(options)

let cars = [
    { name: `milanesa`, precio: `1400` },
    { name: `Pollo frito`, precio: `2100` }
]

database(`cars`).insert(cars)
    .then(response => console.log(response))
    .catch(err => console.log(err))
    .finally(() => database.destroy())
const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'DataNewGG',
    password: 'postgres',
    port: 5432
})

client.connect()


module.exports = client
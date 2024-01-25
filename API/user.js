const client = require('./connect.js')

const createTable = () => {
    const query = `CREATE TABLE UsersTable(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    password VARCHAR(255)
    );`
    client.query(query);
}



function addUser(name, password){
    const query = `INSERT INTO UsersTable (name, password) VALUES('${name}','${password}')`
    client.query(query)
}

function findUser(name, callback){
    const query = `SELECT * FROM UsersTable WHERE name = '${name}'`
    client.query(query, (err,res)=>{
        callback(res.rows)
    })
}

function allUsers(callback){
    const query = "SELECT * FROM UsersTable"
    client.query(query, (err,res)=>{
        callback(res.rows)
    })
}


module.exports = {
    'addUser': addUser,
    'allUsers': allUsers,
    "findUser": findUser,
}

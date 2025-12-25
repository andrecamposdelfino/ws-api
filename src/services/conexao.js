const mysql = require('mysql2/promise')
require('dotenv').config()

const conexao = mysql.createPool({
    host: process.env.HOST_NAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

if(conexao){
    console.log('Conectado com sucesso!!');   
}else{
    console.log('Não conseguiu conectar');  
}

module.exports = conexao
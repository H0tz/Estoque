let express = require('express');
let router = express.Router();
let produtos = require('./produtos');
let pessoas = require('./pessoas');
let lancamentos = require('./lancamentos');

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD || "",
        database : process.env.DB_SCHEMA,
    }
});

produtos.criarRotas(router, knex);
pessoas.criarRotas(router, knex);
lancamentos.criarRotas(router, knex);

module.exports = router;
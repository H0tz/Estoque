(function () {
    'use strict';

    let db = require('./helpers/db');

    module.exports = {
        async criarRotas(router, knex) {
            router.get('/pessoas', async function (req, res) {
                res.json(await db.get(knex, req.query));
            });

            router.post('/pessoas', async function (req, res) {
                res.send(await db.create(knex, req.body));
            });

            router.post('/pessoasdelete', async function (req, res) {
                res.send(await db.delete(knex, req.body.cpf));
            });
        }
    };
}());
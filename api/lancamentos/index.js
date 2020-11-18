(function () {
    'use strict';

    let db = require('./helpers/db');

    module.exports = {
        async criarRotas(router, knex) {
            router.get('/lancamentos', async function (req, res) {
                res.json(await db.get(knex, req.query));
            });

            router.post('/lancamentos', async function (req, res) {
                res.send(await db.create(knex, req.body));
            });

            router.post('/lancamentosdelete', async function (req, res) {
                res.json(await db.delete(knex, req.body));
            });
        },
    };
}())
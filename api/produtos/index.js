(function () {
    'use strict';

    let db = require('./helpers/db');

    module.exports = {
        async criarRotas(router, knex) {
            router.get('/produtos', async function (req, res) {
                res.json(await db.get(knex, req.query));
            });

            router.post('/produtos', async function (req, res) {
                res.send(await db.create(knex, req.body));
            });

            router.post('/produtosdelete', async function (req, res) {
                res.send(await db.delete(knex, req.body.id));
            });
        },
    };
}())
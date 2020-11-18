(function () {
    "use strict";

    module.exports = {
        async get(knex, filters) {
            try {
                return await knex('produtos');
            } catch (error) {
                throw new Error(error);
            }
        },
        async create(knex, produto) {
            try {
                if (produto.id) {
                    return await knex('produtos')
                        .where('id', '=', produto.id)
                        .update({ ...produto }).then(() => `Produto ${produto.nome} atualizado com sucesso`);
                } else {
                    return await knex('produtos')
                        .insert(produto)
                        .then(response => {
                            return { id: response[0], msg: `Produto ${produto.nome} cadastrado com sucesso` }
                        });
                }

            } catch (error) {
                throw new Error(error);
            }
        },
        async delete(knex, id) {
            try {
                if (!id) {
                    return 'O id do produto e necessario';
                }

                return await knex('produtos')
                    .where('id', id)
                    .del().then(() => `Produto ${id} deletado com sucesso`);
            } catch (error) {
                throw new Error(error);
            }
        }
    }
}());
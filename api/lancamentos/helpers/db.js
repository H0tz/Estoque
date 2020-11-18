(function () {
    "use strict";

    module.exports = {
        async get(knex, filters) {
            try {
                return await knex('lancamentos');
            } catch (error) {
                throw new Error(error);
            }
        },
        async create(knex, lancamento) {
            try {
                await knex('produtos').where('id', lancamento.id_produto).increment({ quantidade: lancamento.quantidade });
                return await knex('lancamentos')
                        .insert(lancamento)
                        .then((result) => `lancamento ${result[0]} cadastrado com sucesso`);
                
            } catch (error) {
                throw new Error(error);
            }
        },
        async delete(knex, lancamento) {
            try {
                if (!lancamento.id) {
                    return 'O id do lancamento e necessario';
                }
 
                await knex('produtos').where('id', lancamento.id_produto).decrement({ quantidade: lancamento.quantidade });
                return knex('lancamentos')
                    .where('id', lancamento.id)
                    .del().then(() => `Lancamento ${lancamento.id} deletado com sucesso`);
            } catch (error) {
                throw new Error(error);
            }
        }
    }
}());
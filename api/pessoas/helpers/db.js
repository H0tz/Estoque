(function () {
    "use strict";

    module.exports = {
        async get(knex, filters) {
            try {
                if(!filters.type) throw new Error('Tipo de pessoa necessario');

                if (filters.type === 'all') {
                    return await knex('pessoas');
                } else if(filters.type === 'Clientes'){
                    return await knex('pessoas').where('cliente', 1);
                } else {
                    return await knex('pessoas').where('fornecedor', 1);
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        async create(knex, pessoa) {
            try {
                if(!pessoa.cpf) return { status: 400, msg: 'O cpf da pessoa e necessario' };

                if (await knex('pessoas').where('cpf', pessoa.cpf).select('*').then(result => result.length) > 0){
                    return await knex('pessoas')
                        .where('cpf', '=', pessoa.cpf)
                        .update({ ...pessoa }).then(() => `${pessoa.cliente ? 'Cliente' : 'Fornecedor'} ${pessoa.nome} atualizado com sucesso`);
                } else {
                    return await knex('pessoas')
                        .insert(pessoa)
                        .then(() => `${pessoa.cliente ? 'Cliente' : 'Fornecedor'} ${pessoa.nome} cadastrado com sucesso`);
                }
                
            } catch (error) {
                throw new Error(error);
            }
        },
        async delete(knex, cpf) {
            try {
                if (!cpf) {
                    return 'O cpf da pessoa e necessario';
                }

                return knex('pessoas')
                    .where('cpf', cpf)
                    .del().then(() => `Pessoa ${cpf} deletada com sucesso`);
            } catch (error) {
                throw new Error(error);
            }
        }
    }
}());
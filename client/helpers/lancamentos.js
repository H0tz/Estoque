let modalLancamento = {};

const renderLancamentos = async (params, lancamentos) => {
    let forceUpdate;
    if(typeof params === 'object'){
        forceUpdate = params.forceUpdate;
    } else {
        forceUpdate = params
    }

    if(!lancamentos){ lancamentos = await getLancamentos(forceUpdate) }
    let pessoas = await getPessoas('all');
    let produtos = await getProdutos();

    $('.content-header-title').html('Lancamentos');
    $('.content-header-new').data('type', 'Lancamentos');
    $('.content-header-new').data('modal', 'lancamentos');
    $('.content-header-new').data('modalLabel', 'Cadastrar Lancamentos');
    $('.content-header-new-label').html('Novo lancamento <i class="content-header-new-icon fas fa-plus"></i>');

    $('.table').html(`
        <thead class="thead-dark">
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Cliente/Fornecedor</th>
                <th scope="col">Tipo</th>
                <th scope="col">Produto</th>
                <th scope="col">Quantidade</th>
                <th scope="col">Valor</th>
                <th scope="col">Observacao</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody id="table-rows"></tbody>
    `);

    lancamentos.map(lancamento => {
        let pessoa = pessoas.filter(pessoa => pessoa.cpf === lancamento.cpf_pessoa)[0];
        let produto = produtos.filter(produto => produto.id === lancamento.id_produto)[0];
        $('#table-rows').append(`
            <tr id="table-row-${lancamento.id}">
                <th scope="row">${lancamento.id}</th>
                <td>${pessoa.nome }</td>
                <td>${lancamento.entrada ? 'Entrada' : 'Saida' }</td>
                <td>${produto.nome}</td>
                <td>${lancamento.quantidade}</td>
                <td>${lancamento.valor}</td>
                <td>${lancamento.observacao}</td>
                <td class="text-right" scope="row">
                    <button data-quantidade="${lancamento.quantidade}" data-id_produto="${produto.id}" data-id="${lancamento.id}" class="btn btn-link delete-lancamento">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `);
    });
}

// Handle list in and outs
$('body').on('click', '#listar-lancamentos', function (event) {
    renderLancamentos();
});

// Funcao que retorna clientes/fornecedores 
const getLancamentos = async forceUpdate => {
    if (!sessionStorage.getItem('lancamentos') || forceUpdate) {
        try {
            let lancamentos = await $.get('http://localhost:8000/api/lancamentos');
            sessionStorage.setItem('lancamentos', JSON.stringify(lancamentos));
            return lancamentos;
        } catch (err) {
            $.toaster({ message : err , priority : 'danger' });
            throw new Error(err);
        }
    } else {
        return JSON.parse(sessionStorage.getItem('lancamentos'));
    }
};

// Handle modal changes
$('.modal-lancamentos-item').on('change', function() {
    let campo = $(this).attr("id");
        campo = campo.substring(18, campo.length);

    modalLancamento[campo] = this.value;
});

// Handle modal save
$('body').on('click', '#modal-lancamentos-save', async function(event) {
    $.post('/api/lancamentos', { ...modalLancamento }).done(response => {
        // clearModal();
        $('#modal-lancamentos').modal('hide');
        $.toaster({ message : response });
        let produtos = JSON.parse(sessionStorage.getItem('produtos')).map(produto => {
            if(produto.id == modalLancamento.id_produto) {
                produto.quantidade += parseInt(modalLancamento.quantidade);
                return produto;
            }
            return produto
        });
        sessionStorage.setItem("produtos", JSON.stringify(produtos));
        renderLancamentos(true);
    }).fail(err => {
        clearModal();
        $('#modal-lancamentos').modal('hide');
        $.toaster({ message : err, priority: 'danger'});
    })
});

// Bind delete product funcion
$('body').on('click', '.delete-lancamento', async function (event) {
    let id = parseInt( $(this).data('id') );
    let quantidade = parseInt( $(this).data('quantidade') );
    let id_produto = parseInt( $(this).data('id_produto') );
    let lancamentos = await getLancamentos();
    lancamentos = lancamentos.filter(lancamento => lancamento.id != id);
    let produtos = JSON.parse(sessionStorage.getItem('produtos')).map(produto => {
        if(produto.id == id_produto) {
            produto.quantidade -= parseInt(quantidade)
            return produto;
        }
        return produto
    });
    
    $.post('http://localhost:8000/api/lancamentosdelete', { id, quantidade, id_produto }).done( (response) => {
        $(`#table-row-${id}`).remove();
        sessionStorage.setItem("lancamentos", JSON.stringify(lancamentos));
        sessionStorage.setItem("produtos", JSON.stringify(produtos));
        renderLancamentos();
        $.toaster({ message : response });
    }).fail((err) => {
        $.toaster({ message : err , priority : 'danger' });
    })

});
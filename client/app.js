// Handle New
$('body').on('click', '.content-header-new', async function (event) {
    let type = $('.content-header-new').data('type');
    let modal = $('.content-header-new').data('modal');
    let label = $('.content-header-new').data('modalLabel');

    $(`#modal-${modal}-title`).html(label);
    $(`#modal-${modal}`).modal();
    $(`#modal-${modal}-save`).data('type', type);
    if (type === 'Produtos') {
        modalProduto.id = null;
    } else if (type === 'Clientes' || type === 'Fornecedores') {
        modalPessoa.cpf = null;
    } else if (type === 'Lancamentos') {
        let pessoas = await getPessoas('all');
        let produtos = await getProdutos();

        if (!$('#modal-lancamentos-cpf_pessoa').data('loaded')) {
            $('#modal-lancamentos-cpf_pessoa').html('<option hidden disabled selected value>Escolha um cliente ou fornecedor</option>');
            pessoas.map(pessoa => {
                $('#modal-lancamentos-cpf_pessoa').append(`
                    <option value="${pessoa.cpf}">${pessoa.nome}</option>
                `);
            })
            $('#modal-lancamentos-cpf_pessoa').data('loaded', true)
        }

        if (!$('#modal-lancamentos-id_produto').data('loaded')) {
            $('#modal-lancamentos-id_produto').html('<option hidden disabled selected value>Escolha um produto</option>');
            produtos.map(produto => {
                $('#modal-lancamentos-id_produto').append(`
                    <option value="${produto.id}">${produto.nome}</option>
                `);
            })
            $('#modal-lancamentos-id_produto').data('loaded', true)
        }
    }
})

// Render products at document ready
$(async function () {
    renderProdutos()
});
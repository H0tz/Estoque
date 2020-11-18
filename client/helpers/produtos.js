let modalProduct = {};

// Render product table
const renderProdutos = async produtos => {
    if(!produtos) { produtos = await getProdutos() }

    $('.content-header-title').html('Produtos');
    $('.content-header-new').data('type', 'produtos');
    $('.content-header-new').data('modal', 'produtos');
    $('.content-header-new').data('modalLabel', 'Cadastrar produto');
    $('.content-header-new-label').html(`Novo Produto <i class="content-header-new-icon fas fa-plus"></i>`);

    $('.table').html(`
        <thead class="thead-dark">
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Nome</th>
                <th scope="col">Descricao</th>
                <th scope="col" class="text-right">Quantidade</th>
                <th scope="col" class="text-right">Custo</th>
                <th scope="col" class="text-right">Preco</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody id="table-rows"></tbody>
    `);

    produtos.map(produto => {
        $('#table-rows').append(`
            <tr id="table-row-${produto.id}">
                <th scope="row">${produto.id}</th>
                <td>${produto.nome}</td>
                <td>${produto.descricao}</td>
                <td class="text-right">${produto.quantidade}</td>
                <td class="text-right">${produto.custo}</td>
                <td class="text-right">${produto.preco}</td>
                <td class="text-right" scope="row">
                    <button data-id="${produto.id}" class="btn btn-link edit-product">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button data-id="${produto.id}" class="btn btn-link delete-product">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `);
    });
}

// Handle list products
$('body').on('click', '#listar-produtos', function (event) {
    renderProdutos();
});

// Bind edit button function
$('body').on('click', '.edit-product', function (event) {
    // open the product edit modal
    $('#modal-produtos').modal();
    $(`#modal-produtos-title`).html('Editar produto');

    let produtos = JSON.parse(sessionStorage.getItem("produtos"));

    // filter the selected product
    let product = produtos.filter(produto => 
        produto.id === $(this).data('id')
    )[0];

    // Loop through the object keys and set fields values
    for (var [key, value] of Object.entries( product )) {
        $(`#modal-produtos-${key}`).val(value);
        modalProduct[key] = value;
    }
});

// Handle modal changes
$('.modal-produtos-item').on('keyup', function() {
    let campo = $(this).attr("id");
        campo = campo.substring(15, campo.length);

    modalProduct[campo] = this.value;
});

// Bind modal product save
$('body').on('click', '#modal-produtos-save', async function (event) {
    let produtos = JSON.parse(sessionStorage.getItem("produtos"));
    
    $.post('http://localhost:8000/api/produtos', modalProduct).done( (response) => {
        if(modalProduct.id){
            produtos = produtos.map(produto => {
                if (produto.id === modalProduct.id){
                    produto.nome = modalProduct.nome;
                    produto.descricao = modalProduct.descricao;
                    produto.quantidade = modalProduct.quantidade;
                    produto.custo = modalProduct.custo;
                    produto.preco = modalProduct.preco;
        
                    return produto;
                }
                return produto
            });
        } else {
            modalProduct.id = response.id;
            produtos.push(modalProduct);
        }
        sessionStorage.setItem("produtos", JSON.stringify(produtos));
        renderProdutos();
        $('#modal-produtos').modal('hide');
        $.toaster({ message : response.msg });
    }).fail((err) => {
        $.toaster({ message : err , priority : 'danger' });

    })

});

// Bind delete product funcion
$('body').on('click', '.delete-product', function (event) {
    let id = parseInt( $(this).data('id') );
    let produtos = JSON.parse(sessionStorage.getItem("produtos"));
    
    $.post('http://localhost:8000/api/produtosdelete', { id }).done( (response) => {
        produtos = produtos.filter(produto => produto.id !== id);
        $(`#table-row-${id}`).remove();
        sessionStorage.setItem("produtos", JSON.stringify(produtos));
        $.toaster({ message : response });
    }).fail((err) => {
        $.toaster({ message : err , priority : 'danger' });
    })

});

async function getProdutos() {
    if (!sessionStorage.getItem("produtos")) {
        try {
            let produtos = await $.get('http://localhost:8000/api/produtos');
            sessionStorage.setItem("produtos", JSON.stringify(produtos));
            return produtos;
        } catch (err) {
            $.toaster({ message : err , priority : 'danger' });
            return false;
        }
    } else {
        return JSON.parse(sessionStorage.getItem('produtos'));
    }
}
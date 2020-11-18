let modalPessoa = {};

/*
Render product table

params:
    pessoas = array de objetos de pessoas
    type = clientes || fornecedores (string) 
*/
const renderPessoas = async (params, pessoas) => {
    let type, forceUpdate;
    if(typeof params === 'object'){
        type = params.type;
        forceUpdate = params.forceUpdate;
    } else {
        type = params
    }

    if(!pessoas){ pessoas = await getPessoas(type, forceUpdate) }

    $('.content-header-title').html(type);
    $('.content-header-new').data('type', type);
    $('.content-header-new').data('modal', 'pessoas');
    $('.content-header-new').data('modalLabel', `Cadastrar ${type === 'Clientes' ? 'cliente' : 'fornecedor'}`);
    $('.content-header-new-label').html(`Novo ${type === 'Clientes' ? 'cliente' : 'fornecedor'} <i class="content-header-new-icon fas fa-plus"></i>`);

    $('.table').html(`
        <thead class="thead-dark">
            <tr>
                <th scope="col">CPF</th>
                <th scope="col">Nome</th>
                <th scope="col">Telefone</th>
                <th scope="col">Endereco</th>
                <th scope="col">CEP</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody id="table-rows"></tbody>
    `);

    pessoas.map(pessoa => {
        $('#table-rows').append(`
            <tr id="table-row-${pessoa.cpf}">
                <th scope="row">${pessoa.cpf}</th>
                <td>${pessoa.nome}</td>
                <td>${pessoa.telefone}</td>
                <td>${pessoa.endereco}</td>
                <td>${pessoa.cep}</td>
                <td class="text-right" scope="row">
                    <button data-type="${type}" data-cpf="${pessoa.cpf}" class="btn btn-link edit-pessoa">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button data-type="${type}" data-cpf="${pessoa.cpf}" class="btn btn-link delete-pessoa">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `);
    });
}


// Funcao que retorna clientes/fornecedores 
const getPessoas = async (type, forceUpdate) => {
    if (!sessionStorage.getItem(type) || forceUpdate) {
        try {
            let pessoas = await $.get('http://localhost:8000/api/pessoas', { type });
            sessionStorage.setItem(type, JSON.stringify(pessoas));
            return pessoas;
        } catch (err) {
            $.toaster({ message : err , priority : 'danger' });
            throw new Error(err);
        }
    } else {
        return JSON.parse(sessionStorage.getItem(type));
    }
};

// Bind ao botao do dropdown para listar clientes
$('body').on('click', '#listar-clientes', function (event) {
    renderPessoas('Clientes');
});

// Bind ao botao do dropdown para listar clientes
$('body').on('click', '#listar-fornecedores', function (event) {
    renderPessoas('Fornecedores');
});


// Bind edit button function
$('body').on('click', '.edit-pessoa', async function (event) {
    let type = $(this).data('type');
    // open the product edit modal
    $('#modal-pessoas').modal();
    $(`#modal-pessoas-title`).html(`Editar ${type}`);
    $(`#modal-pessoas-save`).data('type', type);

    let pessoas = await getPessoas(type);

    // filter the selected product
    let pessoa = pessoas.filter(pessoa => 
        pessoa.cpf == $(this).data('cpf')
    )[0];

    // Loop through the object keys and set fields values
    for (var [key, value] of Object.entries( pessoa )) {
        $(`#modal-pessoas-${key}`).val(value);
        modalPessoa[key] = value;
    }
});

// Bind delete product funcion
$('body').on('click', '.delete-pessoa', async function (event) {
    let cpf = $(this).data('cpf');
    let type = $(this).data('type')
    let pessoas = await getPessoas(type)
    
    $.post('http://localhost:8000/api/pessoasdelete', { cpf }).done( (response) => {
        pessoas = pessoas.filter(pessoa => pessoa.cpf != cpf);
        $(`#table-row-${cpf}`).remove();
        sessionStorage.setItem(type, JSON.stringify(pessoas));
        $.toaster({ message : response });
    }).fail((err) => {
        $.toaster({ message : err, priority : 'danger' });
    })

});

// Handle modal changes
$('.modal-pessoas-item').on('keyup', function() {
    let campo = $(this).attr("id");
        campo = campo.substring(14, campo.length);

    modalPessoa[campo] = this.value;
});

// Handle modal save
$('body').on('click', '#modal-pessoas-save', async function(event) {
    let type = $(this).data('type');
    modalPessoa.fornecedor = type === 'Fornecedores' ? 1 : 0;
    modalPessoa.cliente = type === 'Clientes' ? 1 : 0;
    $.post('/api/pessoas', { ...modalPessoa }).done(response => {
        if(response.statusCode === 500){
            $.toaster({ message : response.msg, priority: 'danger'});
        }

        clearModal();
        $('#modal-pessoas').modal('hide');
        $.toaster({ message : response });
        renderPessoas({type: type, forceUpdate: true});
    }).fail(err => {
        clearModal();
        $('#modal-pessoas').modal('hide');
        $.toaster({ message : err, priority: 'danger'});
    })
});

function clearModal() {
    for (let campo of Object.keys(modalPessoa)) {
        modalPessoa[campo] = '';
        $(`#modal-pessoas-${campo}`).val('');
    }
}
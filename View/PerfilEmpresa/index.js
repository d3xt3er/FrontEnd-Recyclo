// invoca form para a edicao das 
// informacoes do estabecimento

var nome = localStorage.getItem('nome');
var senha = localStorage.getItem('senha');

// VARIAVEIS PARA O FORMULARIO DE EDIÇÃO
var id_company;
var nameCompany;
var cnpjCompany;
var telefoneCompany;

fetch(`https://backend-recyclo.herokuapp.com/empresa/company/${nome}/${senha}`, {
        method: 'get'
    })
    .then((resp) => resp.json())
    .then(function(data) {

        // Nome do localstorage
        var name = localStorage.getItem('nome');
        document.getElementById("title").innerHTML = name;

        // informações vindas da API
        document.getElementById("id_empresa").innerHTML = data.cd_empresa;
        nameCompany = document.getElementById("nomeEmpresa").innerHTML = data.nm_empresa;
        cnpjCompany = document.getElementById("cnpj").innerHTML = data.cd_cnpj;
        telefoneCompany = document.getElementById("telefone").innerHTML = data.cd_telefone;
    })
    .catch(function(err) {
        console.log(err);
    });


// Função exibe os pontos
function getPoints() {
    //http://localhost:8080/empresa/ponto/${nome}/${senha} || https://backend-recyclo.herokuapp.com/empresa/ponto/${nome}/${senha}
    return fetch(`https://backend-recyclo.herokuapp.com/empresa/ponto/${nome}/${senha}`).then(res =>
        res.json()
    );
}


const app = document.getElementById("pontos");

const pointList = document.createElement("ol");
pointList.className = "ponto";


getPoints().then(res => {

    const users = res.forEach(point => {
        const ul = document.createElement('ul');
        ul.className = "ponto";

        const linome = document.createElement('li');
        const txt = document.createElement('a');
        // const nm = document.createElement('p');
        var nome_ponto = txt.innerText = point.nm_ponto;
        linome.appendChild(txt);
        ul.appendChild(linome);

        const logra = document.createElement('li');
        var id_ponto = logra.id = `${point.cd_ponto_coleta}`;
        var endereco_ponto = txt.innerText = point.nm_logradouro;
        logra.appendChild(txt);
        ul.appendChild(logra);


        // buttons 
        for (var i = 0; i < 2; i++) {
            const btn = document.createElement("img");;
            const li = document.createElement("li");
            btn.className = "PontoIcone";
            li.style = "float:right";

            if (i == 0) { // Deletar
                btn.src = "../img/icones/deletar.png";
                btn.title = "Deletar Ponto";
                btn.onclick = function() {
                    var cod_empresa = document.getElementById("id_empresa").textContent;
                    Swal.fire({
                        text: "Você realmente deseja deletar esta ponto de coleta?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        cancelButtonText: 'Não',
                        confirmButtonText: 'Sim'
                    }).then((result) => {
                        if (result.isConfirmed) {

                            var dPoint = JSON.stringify({
                                "id": id_ponto,
                                "id_empresa": cod_empresa
                            })

                            // var url = "http://localhost:8080/empresa/deletar/ponto/";

                            var url = "https://backend-recyclo.herokuapp.com/empresa/deletar/ponto/";

                            var request = new XMLHttpRequest();
                            request.open("DELETE", url);

                            request.setRequestHeader("Accept", "application/json");
                            request.setRequestHeader("Content-Type", "application/json");

                            request.onreadystatechange = function() {
                                if (request.readyState === 4) {
                                    console.log(request.status);
                                    console.log(request.responseText);
                                }
                            };

                            request.send(dPoint);

                            Swal.fire({
                                icon: 'success',
                                title: 'Deletado com sucesso!',
                                showConfirmButton: false,
                                timer: 1500
                            }).then((result) => {
                                if (result.dismiss === Swal.DismissReason.timer) {
                                    location.reload()
                                }
                            })
                        }
                    })

                }
                li.appendChild(btn);
            } else { // editar
                btn.src = "../img/icones/editar.png";
                btn.title = "Editar Ponto";
                btn.onclick = function() {


                    Swal.fire({
                        title: "Adicionar Ponto de Coleta",
                        html: '<form id="EditarInformacao">' +
                            `<input id="name_ponto" placeholder="Nome do Ponto:" class="txtEditar" type="text" autocomplete="off" value="${nome_ponto}">` +
                            `<input id="pontoE" placeholder="Endereço do Ponto:" class="txtEditar" type="text" autocomplete="off" value="${endereco_ponto}">` +
                            '</form>',
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: `Adicionar`,
                        denyButtonText: `Cancelar`,
                    }).then((result) => {
                        if (result.isConfirmed) {

                            var nomeP = document.getElementById("name_ponto").value;
                            var PontoE = document.getElementById("pontoE").value;

                            // var url = "http://localhost:8080/empresa/ponto/alterar";
                            var url = "https://backend-recyclo.herokuapp.com/empresa/ponto/alterar";

                            var aPoint = JSON.stringify({
                                "id": id_ponto,
                                "nome": nomeP,
                                "logradouro": PontoE
                            })

                            // console.log(aPoint);
                            var xhr = new XMLHttpRequest();
                            xhr.open("PUT", url);

                            xhr.setRequestHeader("Accept", "application/json");
                            xhr.setRequestHeader("Content-Type", "application/json");

                            xhr.onreadystatechange = function() {
                                if (xhr.readyState === 4) {
                                    console.log(xhr.status);
                                    console.log(xhr.responseText);
                                }
                            };

                            xhr.send(aPoint);

                            Swal.fire({
                                icon: 'success',
                                title: 'Alterado com sucesso!',
                                showConfirmButton: false,
                                timer: 1500
                            }).then((result) => {
                                if (result.dismiss === Swal.DismissReason.timer) {
                                    location.reload()
                                }
                            })
                        }
                    })

                }
                li.appendChild(btn);
            }
            ul.appendChild(li);
        }
        document.getElementById("pontos").appendChild(ul);
    });


});

//ALTERAR - Empresa
function EditarInfo() {

    Swal.fire({
        title: "Editar informações",
        html: '<form id="EditarInformacao">' +
            `<input id="FormNome" style="font-weight:bold;" placeholder="Razão:" class="txtEditar" type="text" value="${nameCompany}">` +
            `<input id="formTelefone" style="font-weight:bold;" placeholder="Telefone:" class="txtEditar" type="text" value="${telefoneCompany}">` +
            `<input id="formSenha" 
                type="password" 
                placeholder="Sua senha: "
                class="txtEditar img" 
                type="text" 
                style="font-weight:bold;"
                onclick="hiddenPassword()" value="${senha}">` +
            `<input id="formConfirmar" style="font-weight:bold;" placeholder="Sua nova senha:" type="password" class="txtEditar" type="text">` +
            '</form>',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Salvar`,
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {


            var id = document.getElementById("id_empresa").textContent;
            var nome = document.getElementById("FormNome").value;
            var telefone = document.getElementById("formTelefone").value;
            var senha = document.getElementById("formConfirmar").value;

            var company = JSON.stringify({
                "id": id,
                "nome": nome,
                "senha": senha,
                "telefone": telefone,
            })

            // var url = "http://localhost:8080/empresa/alterar";

            var url = "https://backend-recyclo.herokuapp.com/empresa/alterar";

            var request = new XMLHttpRequest();
            request.open("PUT", url);

            request.setRequestHeader("Accept", "application/json");
            request.setRequestHeader("Content-Type", "application/json");

            request.onreadystatechange = function() {
                if (request.readyState === 4) {
                    console.log(request.status);
                    console.log(request.responseText);
                }
            };

            request.send(company);

            Swal.fire({
                icon: 'success',
                title: 'Alterado com sucesso!',
                showConfirmButton: false,
                timer: 1500
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    window.location.assign("../Login/index.html");
                }
            })
        }
    })
}

function hiddenPassword() {
    var pass = document.getElementById("formSenha");
    if (pass.type == "password") {
        pass.type = "text";
    } else {
        pass.type = "password";
    }
}

// deletar Ponto de coleta
// function deletarPonto() {
//     Swal.fire({
//         text: "Você realmente deseja deletar esta ponto de coleta?",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         cancelButtonText: 'Não',
//         confirmButtonText: 'Sim'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             Swal.fire(
//                 'Ponto Deletado',
//                 '',
//                 'success'
//             )
//         }
//     })
// }

// Função adicionar ponto
function adicionarPonto() {
    Swal.fire({
        title: "Adicionar Ponto de Coleta",
        html: '<form id="EditarInformacao">' +
            '<input id="nmPonto" placeholder="Nome do Ponto:" class="txtEditar" type="text" autocomplete="off">' +
            '<input id="pontoEndereco" placeholder="Endereço do Ponto:" class="txtEditar" type="text" autocomplete="off">' +
            '</form>',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Adicionar`,
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {

            var _id = document.getElementById("id_empresa").textContent;
            var nmPonto = document.getElementById("nmPonto").value;
            var pontoEndereco = document.getElementById("pontoEndereco").value;


            fetch(`https://us1.locationiq.com/v1/search.php?key=5f817f15c518de&q=${pontoEndereco}&limit=1&countrycodes=Brasil&format=json`, {
                    method: 'get'
                })
                .then((resp) => resp.json())
                .then(function(data) {
                    data.forEach(location => {
                        $.ajax({
                                method: "POST",
                                url: "https://backend-recyclo.herokuapp.com/empresa/ponto/criar",
                                data: {
                                    "id": _id,
                                    "nome": nmPonto,
                                    "endereco": pontoEndereco,
                                    "latitude": location.lat,
                                    "longitude": location.lon
                                }
                            }).done(function(msg) {
                                console.log("Cadastrado");
                            })
                            .fail(function(msg) {
                                console.log(msg);
                            });
                    });
                })
                .catch(function(err) {
                    console.log(err);
                });

            Swal.fire({
                icon: 'success',
                title: 'Adicionado com sucesso!',
                showConfirmButton: false,
                timer: 1500
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    location.reload();
                }
            })
        }
    })
}

// function editarPonto() {
//     Swal.fire({
//         title: "Adicionar Ponto de Coleta",
//         html: '<form id="EditarInformacao">' +
//             '<input id="nmPonto" placeholder="Nome do Ponto:" class="txtEditar" type="text">' +
//             '<input id="pontoTelefone" placeholder="telefone do Ponto:" class="txtEditar" type="text">' +
//             '</form>',
//         showDenyButton: true,
//         showCancelButton: false,
//         confirmButtonText: `Adicionar`,
//         denyButtonText: `Cancelar`,
//     });
// }
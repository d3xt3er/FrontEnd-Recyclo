var email = localStorage.getItem('email');
var senha = localStorage.getItem('senha');
var id = localStorage.getItem('id');

// VARIAVEIS PARA O FORMULARIO DE EDIÇÃO
var nameUser;
var cfpUser;
var emailUser;
var telefoneUser;

var cont;
//https://backend-recyclo.herokuapp.com Função que captura as informações do usuario
fetch(`https://backend-recyclo.herokuapp.com/usuario/user/${email}/${senha}`, {
        method: 'get'
    })
    .then((resp) => resp.json())
    .then(function(data) {

        // Nome do localstorage
        // var name = localStorage.getItem('email');
        document.getElementById("title").innerHTML = data.nm_usuario;

        // informações vindas da API
        document.getElementById("id_usuario").innerHTML = data.cd_usuario;
        nameUser = document.getElementById("nome").innerHTML = data.nm_usuario;
        cpfUser = document.getElementById("cpf").innerHTML = data.cd_cpf;
        emailUser = document.getElementById("email").innerHTML = data.ds_email;
        telefoneUser = document.getElementById("telefone").innerHTML = data.cd_telefone;
        senha = document.getElementById("senha").innerHTML = data.cd_senha;
        document.getElementById("senha").innerHTML = "**********";
        cont = data.cd_cpf;
    })
    .catch(function(err) {
        console.log(err);
    });


function hiddenPassword() {
    var pass = document.getElementById("formSenha");
    if (pass.type == "password") {
        pass.type = "text";
    } else {
        pass.type = "password";
    }
}

function mostrarSenha() {

    if (senha == document.getElementById("senha").innerHTML) {
        document.getElementById("senha").innerHTML = "******";
        document.getElementById("senha").title = "Mostrar Senha"
    } else {
        document.getElementById("senha").innerHTML = senha;
        document.getElementById("senha").title = "Ocultar Senha"
    }
}

// Função PUT do usuário
function alterarConta() {

    Swal.fire({
        title: "Editar informações",
        html: '<form id="EditarInformacao" method="PUT">' +
            `<input id="FormNome" style="font-weight: 700;" placeholder="Nome:" class="txtEditar" type="text" value="${nameUser}">` +
            `<input id="formCpf" style="font-weight: 700;" placeholder="CPF:"class="txtEditar" type="text" value="${cpfUser}">` +
            `<input id="formTelefone" style="font-weight: 700;" placeholder="Telefone:" class="txtEditar" type="text" value="${telefoneUser}">` +
            `<input id="formSenha" 
                placeholder="Sua senha:"    
                type="password"     
                class="txtEditar img"   
                onclick="hiddenPassword()"  
                value="${senha}">` +
            '<input id="formConfirmar" placeholder="Sua nova senha:" type="password" class="txtEditar" type="text">' +
            '</form>',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Salvar`,
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {

            //ALTERAR - Usuario
            var id = document.getElementById("id_usuario").textContent;
            var nome = document.getElementById("FormNome").value;
            var telefone = document.getElementById("formTelefone").value;
            var cpf = document.getElementById("formCpf").value;
            var senha = document.getElementById("formConfirmar").value;

            var user = JSON.stringify({
                "id": id,
                "nome": nome,
                "telefone": telefone,
                "cpf": cpf,
                "senha": senha,
            })

            // var url = "http://localhost:8080/usuario/alterar";

            var url = "https://backend-recyclo.herokuapp.com/usuario/alterar";

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

            request.send(user);

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

function hideCpf() {
    var emp = document.getElementById('cpf');
    if (document.getElementById('cpf').innerText != cont)
        document.getElementById('cpf').innerText = cont;
    else {
        document.getElementById('cpf').innerText = "**************";
    }
}

function excluirConta() {
    Swal.fire({
        text: "Você realmente deseja deletar esta conta?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Não',
        confirmButtonText: 'Sim'
    }).then((result) => {
        if (result.isConfirmed) {
            //DELETAR - Usuario

            var _id = document.getElementById("id_usuario").textContent;

            var usuario = JSON.stringify({
                "id": _id
            })

            // var url = "http://localhost:8080/usuario/deletar";

            var url = "https://backend-recyclo.herokuapp.com/usuario/deletar";

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

            request.send(usuario);

            let timerInterval
            Swal.fire({
                icon: "success",
                html: "Sua conta foi excluida!",
                timer: 1000,
                didOpen: () => {
                    timerInterval = setInterval(() => {
                        const content = Swal.getHtmlContainer()

                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)

                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    window.location.assign("../Login/index.html");
                }
            })
        }
    })
}

function Logout() {
    Swal.fire({
        title: 'Tem certeza que deseja sair?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Não',
        confirmButtonText: 'Sim'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.replace("../Login/index.html");
            window.localStorage.removeItem('email');
            window.localStorage.removeItem('senha');
        }
    })
}

function novaSenha() {
    Swal.fire({
        title: "Editar informações",
        html: '<form id="EditarSenha" method="PUT">' +
            `<input id="senhaAntiga" 
                placeholder="Senha atual:"    
                type="password"     
                class="txtEditar img"   
                onclick="hiddenPassword()" >` +
            '<input id="novaSenha" placeholder="Nova senha:" type="password" class="txtEditar" type="text">' +
            '<input id="formConfirmar" placeholder="Confirmar senha:" type="password" class="txtEditar" type="text">' +
            '</form>',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Salvar`,
        denyButtonText: `Cancelar`,
    }).then((result) => {

        if (senha == document.getElementById("senhaAntiga").innerText) {

        }

    });
}



// Função exibe os pontos
function getReports() {
    //http://localhost:8080/empresa/ponto/${email}/${senha} || https://backend-recyclo.herokuapp.com/empresa/ponto/${email}/${senha}
    return fetch(`https://backend-recyclo.herokuapp.com/usuario/denuncias/${email}/${senha}`).then(res =>
        res.json()
    );
}


getReports().then(res => {

    const reports = res.forEach(report => {
        // console.log(report);


        const ul = document.createElement('ul');
        ul.className = 'denuncia';
        const logra = document.createElement('li');
        logra.className = 'logra';
        logra.textContent = report.nm_logradouro;

        data = new Date(report.dt_denuncia);
        dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });

        const dt = document.createElement('li');
        dt.className = "dat";
        dt.textContent = dataFormatada;



        const li = document.createElement('li');
        const img = document.createElement('img');


        img.setAttribute("src", "../img/icones/comentario.png");
        img.onclick = function() {
            Swal.fire({
                text: report.ds_comentario
            });
        }
        ul.appendChild(logra);
        li.appendChild(img);
        ul.appendChild(li);
        ul.appendChild(dt);
        document.getElementById('denuncias').appendChild(ul);
    })

});


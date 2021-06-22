// Codigo JS Front-End
var frmEmpresa = document.getElementById("formEmpresa");
var frmUsuario = document.getElementById("formUsuario");

frmEmpresa.style.display = "none";
document.getElementById("changeE").style.background = "white";
document.getElementById("changeU").style.background = "#35d786";
// Troca o form a de cadastro entre
function SwitchForm(op) {

    // Usuario
    if (op == false) {
        frmEmpresa.style.display = "none";
        frmUsuario.style.display = "flex";
        document.getElementById("changeE").style.background = "white";
        document.getElementById("changeU").style.background = "#35d786";
    }

    // Empresa
    else if (op == true) {
        frmUsuario.style.display = "none";
        frmEmpresa.style.display = "flex";
        document.getElementById("changeE").style.background = "#35d786";
        document.getElementById("changeU").style.background = "white";
    }
}

// Código JS Back-End - Cadastro Usuario

$(document).ready(function() {
    $("#formUser").submit(function(event) {

        event.preventDefault();

        var nome = document.getElementById("nome").value;
        var email = document.getElementById("email").value;
        var cpf = document.getElementById("cpf").value;
        var senha = document.getElementById("senha").value;

        // chave ID  temporária até ser auto increment no banco de dados
        var obj = JSON.stringify({
            "id": 2,
            "nome": nome,
            "email": email,
            "cpf": cpf,
            "senha": senha,
        })

        console.log(obj);


        var url = "http://localhost:8080/usuario/criar/";

        var request = new XMLHttpRequest();
        request.open("POST", url);

        request.setRequestHeader("Accept", "application/json");
        request.setRequestHeader("Content-Type", "application/json");

        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                console.log(request.status);
                console.log(request.responseText);
            }
        };

        request.send(obj);

    });
});


// Código JS Back-End - Cadastro Usuario

$(document).ready(function() {
    $("#formEmpresa").submit(function(event) {

        event.preventDefault();

        var razao = document.getElementById("razao").value;
        var email = document.getElementById("Email").value;
        var cnpj = document.getElementById("cnpj").value;
        var senha = document.getElementById("Senha").value;

        var obj = JSON.stringify({
            "razao": razao,
            "email": email,
            "cnpj": cnpj,
            "senha": senha,
        })

        console.log(obj);

        // var url = "http://localhost:8080/usuario/criar/";

        // var request = new XMLHttpRequest();
        // request.open("POST", url);

        // request.setRequestHeader("Accept", "application/json");
        // request.setRequestHeader("Content-Type", "application/json");

        // request.onreadystatechange = function() {
        //     if (request.readyState === 4) {
        //         console.log(request.status);
        //         console.log(request.responseText);
        //     }
        // };

        // request.send(obj);
    });
});
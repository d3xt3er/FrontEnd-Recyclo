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

// Código JS Back-End

$(document).ready(function() {
    $("#formUser").submit(function(event) {

        event.preventDefault();

        var nome = document.getElementById("nome").value;
        var email = document.getElementById("email").value;
        var cpf = document.getElementById("cpf").value;
        var senha = document.getElementById("senha").value;

        var obj = JSON.stringify({
            "nome": nome,
            "email": email,
            "cpf": cpf,
            "senha": senha,
        })

        console.log(obj);


        var url = "http://localhost:8080/usuario/login/";

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);

        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                console.log(xhr.status);
                console.log(xhr.responseText);
            }
        };

        xhr.send(data);

    });
});


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


        // var xhr = new XMLHttpRequest();
        // var url = "http://localhost:8080/usuario/login/" + nome + "/" + senha + "";
        // xhr.open("GET", url, true);
        // xhr.setRequestHeader("Content-Type", "application/json");
        // xhr.onreadystatechange = function() {
        //     if (xhr.readyState === 4 && xhr.status === 200) {
        //         var json = xhr.responseText;
        //         alert(json);
        //     }
        // };
        // xhr.send();
    });
});
$(document).ready(function() {
    $("#form").submit(function(event) {

        event.preventDefault();

        var nome = document.getElementById("nome").value;
        var senha = document.getElementById("senha").value;

        var request = new XMLHttpRequest();
        var url = "https://backend-recyclo.herokuapp.com/usuario/login/" + nome + "/" + senha + "";
        request.open("GET", url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader('Access-Control-Allow-Origin', '*');
        request.onreadystatechange = function() {

            // Função loader sweetalert
            Swal.fire({
                title: 'Aguarde!',
                html: 'Verificando...',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                },
            });
            if (request.readyState === 4 && request.status === 200) {
                var json = request.responseText;
                if(json == 'Usuario encontrado!'){
                    alert(json)
                }

                else if(json == 'Usuario não existente'){
                    Swal.fire({
                        icon: 'error',
                        title: 'Desculpe,',
                        text: 'Não te encontramos em nosso sistema!',
                    })
                }
            }
        };
        request.send();
    });
});
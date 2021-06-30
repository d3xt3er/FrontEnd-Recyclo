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
            if (request.readyState === 4 && request.status === 200) {
                var json = request.responseText;
                alert(json);
            }
        };
        request.send();
    });


    /* mensagem de erro padrao sweetalert
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
    */

});
$(document).ready(function() {
    $("#form").submit(function(event) {

        event.preventDefault();

        var nome = document.getElementById("nome").value;
        var senha = document.getElementById("senha").value;

        var xhr = new XMLHttpRequest();
        var url = "https://backend-recyclo.herokuapp.com/usuario/login/" + nome + "/" + senha + "";
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var json = xhr.responseText;
                alert(json);
            }
        };
        xhr.send();
    });
});
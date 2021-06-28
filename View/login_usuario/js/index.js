$(document).ready(function() {
    $("form").submit(function(event) {
        var formData = {
            nome: $("#nome").val(),
            senha: $("#senha").val(),
        };
        console.log(formData);
        $.ajax({
            type: "GET",
            url: "https://backend-recyclo.herokuapp.com/usuario/login/",
            data: formData,
            dataType: "json",
            encode: true,
        }).then(function(data) {
            alert(data);
        }).catch(function(error) {
            alert(error.responseText);
        });

        event.preventDefault();
    });
});

/* mensagem de erro padrao sweetalert
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
*/
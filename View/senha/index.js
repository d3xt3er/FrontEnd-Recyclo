// Responsável por verificar usuário
$(document).ready(() => {
    $("#frm").submit((event) => {
        Swal.fire({
            title: 'Aguarde...',
            html: '<img src="../img/Gif-Recyclo.gif" alt="description of gif" style="display: block;  margin-left: auto;margin-right: auto;margin: 3% 94% 28% 45%;" width="500" height="500" /> ',
            //lembrar que tira o click do fundo 
            allowOutsideClick: false,
            showCancelButton: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading()
            },
        });
        event.preventDefault();

        var email = document.getElementById("email").value;

        var request = new XMLHttpRequest();
        // https://backend-recyclo.herokuapp.com/
        // http://localhost:3000/
        var url = "https://backend-recyclo.herokuapp.com/usuario/editar/" + email;

        request.open("GET", url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.setRequestHeader('Access-Control-Allow-Origin', '*');

        request.onreadystatechange = function() {

            if (request.readyState === 4 && request.status === 200) {
                var json = (request.responseText);

                if (json == 'Usuario encontrado!') {
                    Swal.close();
                    
                    document.getElementById('novaSenha').disabled = false;
                    document.getElementById('novaSenhaRepeat').disabled = false;
                    document.getElementById('email').disabled = true;


                } else if (json == 'Usuario não existente') {
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


// Responsável por alterar a senha e retornar para o login
// $(document).ready(() => {

//     $("#frm").submit((event) => {

//         event.preventDefault();

//         var senha = document.getElementById("novaSenha").value;
//         var ConfirmaSenha = document.getElementById("novaSenhaRepeat").value;


//         if (senha != ConfirmaSenha) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Desculpe,',
//                 text: 'Senhas são diferentes!',
//             })
//             return false;
//         } else {
//             $.ajax({
//                     method: "POST",
//                     url: "http://localhost:3000/usuario/editar/" + email,
//                     data: { senha: senha, confSenha: ConfirmaSenha },
//                     beforeSend: function() {
//                         Swal.fire({
//                             title: 'Aguarde...',
//                             html: '<img src="../img/Gif-Recyclo.gif" alt="description of gif" style="display: block;  margin-left: auto;margin-right: auto;" width="600" height="600" /> ',
//                             //lembrar que tira o click do fundo 
//                             allowOutsideClick: false,
//                             showCancelButton: false,
//                             showConfirmButton: false,
//                             onBeforeOpen: () => {
//                                 Swal.showLoading()
//                             },
//                         });
//                     }
//                 }).done(function(msg) {
//                     Swal.fire(
//                         'Parabéns!',
//                         'Cadastrado com sucesso!',
//                         'success',

//                     ).then(() => {
//                         window.location.assign("../Login/index.html");
//                     })

//                 })
                
//         }

//     });
// });
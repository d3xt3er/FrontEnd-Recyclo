// mapa
/* proximos passos do mapa
 * -infobox
 * -icones
 */

function Logout() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Tem certeza que deseja sair?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.replace("../login_usuario/index.html");
            window.localStorage.removeItem('nome');
            window.localStorage.removeItem('senha');

        }
    })
}

function GetMap() {

    var map = new Microsoft.Maps.Map('#myMap');

    navigator.geolocation.getCurrentPosition(function(position) {
        var loc = new Microsoft.Maps.Location(
            position.coords.latitude,
            position.coords.longitude);

        map.setView({ center: loc, zoom: 15 });
    });
}
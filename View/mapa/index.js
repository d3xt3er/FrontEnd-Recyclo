/* proximos passos do mapa
* -infobox
* -icones
*/ 

function GetMap() {
    var map = new Microsoft.Maps.Map('#myMap');


    var center = map.getCenter();

    //Create custom Pushpin
    var pin = new Microsoft.Maps.Pushpin(center, {
        icon: 'LogoRecycloV1-mapa-icon.png',
        anchor: new Microsoft.Maps.Point(12, 39)
    });

    //Add the pushpin to the map
    map.entities.push(pin);
    //Add your post map load code here.
}



function alert(){

}
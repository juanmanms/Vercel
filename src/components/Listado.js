import markers from "./shad.json";

//Hacer un componente que se llame Listado
//Que reciba un json de makers
//Que muestre un listado de los makers
//Que al hacer click en un maker, se muestre en el mapa

function Listado(props) {
    const centro = props.centro;
    const latitud = centro[0];
    const longitud = centro[1];

    return (
        //filtrado(latitud, longitud),
        <div className="listado-store">
        <h3 className="title-listado"> Tiendas más cercanas </h3>
        <ul className="listado">
            {filtrado(latitud, longitud).map(({ Code, Name, Longitude, Latitude, Website, City }) => (
            <div className="item-store" key={Code}>
                <h4>{Name}</h4>
                <p>{City}</p>
            </div>
            
            ))}
        </ul>
        </div>
    );
    }

function filtrado(latitud, longitud) {
    var lista = [];
    for (var i = 0; i < markers.length; i++) {
        var distancia = Math.sqrt(Math.pow((latitud - markers[i].Latitude), 2) + Math.pow((longitud - markers[i].Longitude), 2));
        lista.push({ distancia: distancia, Code: markers[i].Code, Name: markers[i].Name, Longitude: markers[i].Longitude, Latitude: markers[i].Latitude, City: markers[i].City });
    }
    lista.sort(function (a, b) {
        return a.distancia - b.distancia;
    }
    );
    var lista10 = [];
    for (var i = 0; i < 10; i++) {
        lista10.push(lista[i]);
    }
    //console.log(lista10);
    return lista10;
}

export default Listado;

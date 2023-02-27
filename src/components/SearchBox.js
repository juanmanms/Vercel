

function SearchBox(props) {
    return (
        //hacer un modal que aparezca en la parte superior izquierda
        //que tenga un input
        //que al escribir en el input, se filtre el listado de tiendas
        //que al hacer click en una tienda, se muestre en el mapa
        <div className="search-box">
            <div className="search-box-content">
                <input className="search-box-input" type="text" placeholder="Busqueda" />
                <input className="boton" type="submit" value="Tienda" />
                <input className="boton" type="submit" value="Lugar" />
            </div>
        </div>

    );
}

export default SearchBox;
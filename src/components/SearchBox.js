import { useState } from "react";


function SearchBox(props) {
    const [lugar, setLugar] = useState(null);
    if (lugar === "barcelona" || lugar ==="BARCELONA" || lugar === "Barcelona" ) {
        setLugar("Barcelona, España");
    }
    const handleChange = (e) => {
        setLugar(e.target.value);
    };

    return (
        <div className="search-box">
            <div className="search-box-content">
                <input className="search-box-input" type="text" placeholder="Busqueda" onChange={handleChange} />
                <div className="search-box-button">
                    <button className="boton" onClick={() => props.lugar(lugar)}>Buscar</button>
                </div>
            </div>
            {props.distance > 10 ? (
                <div className="search-box-extra">
                    <p className="extra-texto">Aprieta de nuevo buscar si no aparece ningún punto en el mapa</p>
                </div>
            )
                : <> </>}
        </div>

    );
}


export default SearchBox;
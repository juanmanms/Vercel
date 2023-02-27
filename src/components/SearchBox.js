import { useState } from "react";
//hacer un componente para dentro de searchbox
//que se llame Lugares
//que tenga un input


// function Lugares(props) {
//     return (
//         <>
//             <input className="search-box-input" type="text" placeholder="Busqueda" />
//             <div className="search-box-button">
//                 <button className="boton" onClick={() => props.lugar("Hola mundo")}>Buscar</button>
//             </div>
//         </>
//     );
// }
// function Tiendas(props) {
//     return (
//         <>
//             <input className="search-box-input" type="text" placeholder="Busqueda" />
//             <div className="search-box-button">
//                 <input className="boton" type="submit" value="Tiendas" />
//             </div>
//         </>
//     );
// }
// const Radio = (props) => {
//     const onOptionChange = props.onOptionChange;
//     const tipoBusqueda = props.tipoBusqueda;
//     return (
//         <div className="radio">
//             <label>
//                 <input
//                     type="radio"
//                     name="tipoBusqueda"
//                     value="Tiendas"
//                     id="Tiendas"
//                     checked={tipoBusqueda === "Tiendas"}
//                     onChange={onOptionChange}
//                 />
//                 <div class="front-end box">
//                     <span>Front-end</span>
//                 </div>
//             </label>
//             <label>

//                 <input
//                     type="radio"
//                     name="tipoBusqueda"
//                     value="Direcciones"
//                     id="Direcciones"
//                     checked={tipoBusqueda === "Direcciones"}
//                     onChange={onOptionChange}
//                 />
//                 <div class="back-end box">
//                     <span>Back-end</span>
//                 </div>
//             </label>
//         </div>
//     );
// }

function SearchBox(props) {
    // const [tipoBusqueda, setTipoBusqueda] = useState(null);
    // const onOptionChange = (e) => {
    //     setTipoBusqueda(e.target.value);
    // };
    const [lugar, setLugar] = useState(null);
    const handleChange = (e) => {
        setLugar(e.target.value);
    };
    
    return (
        //hacer un modal que aparezca en la parte superior izquierda
        //que tenga un input
        //que al escribir en el input, se filtre el listado de tiendas
        //que al hacer click en una tienda, se muestre en el mapa
        <div className="search-box">
            <div className="search-box-content">
                {/* <Radio onOptionChange={onOptionChange} tipoBusqueda={tipoBusqueda} />
                {tipoBusqueda === "Direcciones" ? <Lugares /> : <Tiendas />} */}
                <input className="search-box-input" type="text" placeholder="Busqueda"  onChange={handleChange} />
            <div className="search-box-button">
                <button className="boton" onClick={() => props.lugar(lugar)}>Buscar</button>
            </div>

            </div>


        </div>

    );
}


export default SearchBox;
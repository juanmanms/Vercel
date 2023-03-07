
import React from 'react'
import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer, InfoWindow } from '@react-google-maps/api';
import Listado from './Listado';
import markers from "./shad.json";
import SearchBox from './SearchBox';

function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

const containerStyle = {
    width: '100vw',
    height: '100vh'
};

const center = {
    lat: 41.55913012885053,
    lng: 2.278457081462427
};

function Map() {
    const [activeMarker, setActiveMarker] = React.useState(null);
    const [currentZoom, setCurrentZoom] = React.useState(10);
    const [map, setMap] = React.useState(null)
    const [centro, setCentro] = React.useState([0, 0]);
    const [distance, setDistance] = React.useState(0);

    function mostrarLugar(datos){
        //obtener center con geocoder
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: datos }, (results, status) => {
            if (status === "OK") {
                const center = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() };
                map.setCenter(center);
                filtrado(map.getCenter())
                if (distance > 10) {
                    map.setZoom(3);
                }
            }
        });
    }

    //funcion que active el marker con el codigo que le pases
    function handleStore(datos) {
        listActiveMarker(datos);
    }

    //funcion que active el marker con el codigo que le pases
    function listActiveMarker(datos) {
        const marker = markers.find((marker) => marker.Code === datos.Code);
        const center = { lat: datos.Latitude, lng: datos.Longitude };
        map.setCenter(center);
        setActiveMarker(marker);
        handleActiveMarker(marker);
    }

    //funcion que calcule la distancia de las tiendas más cercanas
    function distancia() {
        //obtener centro del mapa actual
        const point = map.getCenter();
        //obtener marker más cercano a center
        var lista = [];
        for (var i = 0; i < markers.length; i++) {
            var distancia = Math.sqrt(Math.pow((point.lat() - markers[i].Latitude), 2) + Math.pow((point.lng() - markers[i].Longitude), 2));
            lista.push({ distancia: distancia, Code: markers[i].Code, Name: markers[i].Name, Longitude: markers[i].Longitude, Latitude: markers[i].Latitude, City: markers[i].City });
        }
        lista.sort(function (a, b) {
            return a.distancia - b.distancia;
        }
        );
        console.log(lista[0]);
        setDistance(lista[0].distancia);
        
    }



    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCojF10FtXPizAOWmwabMui19K-XNUeAis"
    })

    function handleActiveMarker(marker) {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    function handleZoomChanged() {
        setCurrentZoom(this.getZoom())
    }

    function filtrado(center) {
        if (Math.abs(center.lat() - centro[0]) > 0.05 || Math.abs(center.lng() - centro[1]) > 0.05) {
            setCentro([center.lat(), center.lng()])
        } else {
            distancia();
        }
            
        //si distance es mayor de 10 cambiar el zoom
        
    }



    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        setMap(map);
        getPosition().then((position) => {
            const { latitude, longitude } = position.coords;
            const center = { lat: latitude, lng: longitude };
            bounds.extend(center);
            map.setCenter(center);
            setCentro([latitude, longitude])
        });
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])


    return isLoaded ? (
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={currentZoom}
                onLoad={onLoad}
                onClick={() => handleActiveMarker(null)}
                onUnmount={onUnmount}
                onZoomChanged={handleZoomChanged}  
                onBoundsChanged={() => filtrado(map.getCenter())}
            >
                <MarkerClusterer>
                    {(clusterer) =>
                        markers.map(({ Code, Name, Longitude, Latitude, Website, City }) => (
                            <Marker
                                key={Code}
                                position={{ lat: Latitude, lng: Longitude }}
                                onClick={() => handleActiveMarker({ Code, Name, Longitude, Latitude, Website })}
                                clusterer={clusterer}
                            >
                                {activeMarker && activeMarker.Code === Code && (
                                    <InfoWindow
                                        onCloseClick={() => handleActiveMarker(null)}
                                    >
                                        <div className='infowindow'>
                                            <h3>{Name}</h3>
                                            <p>{City}</p>
                                            {Website === "" ? <></> : <a href={Website} target="_blank" rel="noreferrer">Ir a la tienda</a>}

                                        </div>
                                    </InfoWindow>
                                )}
                            </Marker>

                        ))
                    }
                </MarkerClusterer>


            </GoogleMap>
            {currentZoom > 10 ? <Listado centro={centro} store={handleStore} /> :  <SearchBox lugar={mostrarLugar} distance={distance}/>}
            
            
            
        </>
    ) : <></>
}

export default React.memo(Map)
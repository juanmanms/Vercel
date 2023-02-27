
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
    width: '98vw',
    height: '95vh'
};

const center = {

    lat: -3.745,
    lng: -38.523
};

function Map() {
    const [activeMarker, setActiveMarker] = React.useState(null);
    const [currentZoom, setCurrentZoom] = React.useState(10);
    const [map, setMap] = React.useState(null)
    const [centro, setCentro] = React.useState([0, 0]);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCojF10FtXPizAOWmwabMui19K-XNUeAis"
    })
    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    function handleZoomChanged(){
        setCurrentZoom(this.getZoom())
      }

      function filtrado(center) {
        setCentro([center.lat(), center.lng()])
          if (Math.abs(center.lat() - centro[0]) > 0.0005 || Math.abs(center.lng() - centro[1]) > 0.0005) {
            console.log("se mueve")
          } else {
            console.log("no se mueve")
          }
      }



    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        setMap(map);
        getPosition().then((position) => {
            const { latitude, longitude } = position.coords;
            const center = { lat: latitude, lng: longitude };
            bounds.extend(center);
            map.setCenter(center);
            setCentro([center.lat(), center.lng()])
        });
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const onPlacesChanged = () => console.log(this.searchBox.getPlaces());  

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
                onDragEnd={() => filtrado(map.getCenter())}
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
                                            <a href={Website} target="_blank" rel="noreferrer">Ir a la tienda</a>
                                        </div>
                                    </InfoWindow>
                                )}
                            </Marker>

                        ))
                    }
                </MarkerClusterer>


            </GoogleMap>
            {currentZoom > 12 ? (
                <Listado centro={centro} />
            ) : (
                <SearchBox />
            )}
        </>
    ) : <></>
}

export default React.memo(Map)
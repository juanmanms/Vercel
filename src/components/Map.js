
import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

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
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCojF10FtXPizAOWmwabMui19K-XNUeAis"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    setMap(map);
    getPosition().then((position) => {
      const { latitude, longitude } = position.coords;
      const center = { lat: latitude, lng: longitude };
      bounds.extend(center);
      map.setCenter(center);
    });
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)
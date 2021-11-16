import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';


const Map = ( {cars} ) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GOOGLE_PLACES_API
  })

  const containerStyle = {
    width: '100%',
    height: '100vh'
  };
  
  const center = {
    lat: cars[0].location.lat,
    lng: cars[0].location.lng
  };

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {cars.map((car, index) => <Marker
            position={{lat: car?.location.lat, lng: car?.location.lng}}
            icon={{url: image, anchor: new google.maps.Point(5, 58)}
            }
        />)}
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)
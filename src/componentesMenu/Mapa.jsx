import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// Replace with your actual Google Maps API Key
const GOOGLE_MAPS_API_KEY = "AIzaSyCy8wOQmKoX59GQcIO_e6AQ78lVe1GQrbA";

const containerStyle = {
  width: '100%',
  height: '500px',
};

const defaultCenter = {
  lat: 9.94992323643781, 
  lng:  -84.26117644028084, 
};

const gyms = [
  {
    id: 1,
    name: "Flex Fitness",
    lat: 9.9498212643781,
    lng: -84.26117644028084,
    address: "Alajuela Province, Guácima, Guácima Abajo",
    phone: "70104863",
  },
 
];

const Mapa = () => {
  const [selectedGym, setSelectedGym] = useState(null);

  const onMarkerClick = (gym) => {
    setSelectedGym(gym);
  };

  const onMapClick = () => {
    setSelectedGym(null); // Close InfoWindow when clicking on map
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={13}
        onClick={onMapClick}
      >
        {gyms.map((gym) => (
          <Marker
            key={gym.id}
            position={{ lat: gym.lat, lng: gym.lng }}
            onClick={() => onMarkerClick(gym)}
          />
        ))}
        

        {selectedGym && (
          <InfoWindow
            position={{
              lat: selectedGym.lat,
              lng: selectedGym.lng,
            }}
            onCloseClick={() => setSelectedGym(null)}
          >
            <div>
              <h3>{selectedGym.name}</h3>
              <p><strong>Address:</strong> {selectedGym.address}</p>
              <p><strong>Phone:</strong> {selectedGym.phone}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
    
  );
};

export default Mapa;

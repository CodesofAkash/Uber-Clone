import React, { useState, useEffect } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100%',
}

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(null)

  useEffect(() => {
    const updateLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude })
        },
        (error) => {
          console.error('Error getting location:', error)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      )
    }

    // Update location immediately and then every 10 seconds
    updateLocation()
    const intervalId = setInterval(updateLocation, 10000)

    return () => clearInterval(intervalId) // Cleanup interval on component unmount
  }, [])

  return (
    <LoadScript googleMapsApiKey={import.meta.env.GOOGLE_MAPS_API}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition || { lat: 0, lng: 0 }}
        zoom={15}
      >
        {currentPosition && <Marker position={currentPosition} />}
      </GoogleMap>
    </LoadScript>
  )
}

export default LiveTracking
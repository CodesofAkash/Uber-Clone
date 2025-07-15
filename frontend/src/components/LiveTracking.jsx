import React, { useState, useEffect } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'
import toast from 'react-hot-toast'

const containerStyle = {
  width: '100%',
  height: '100%',
}

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(null)

  useEffect(() => {
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ lat: latitude, lng: longitude })
          },
          (error) => {
            console.error('Error getting location:', error)
            switch(error.code) {
              case error.PERMISSION_DENIED:
                toast.error('Location access denied. Please enable location services.');
                break;
              case error.POSITION_UNAVAILABLE:
                toast.error('Location information unavailable.');
                break;
              case error.TIMEOUT:
                toast.error('Location request timed out.');
                break;
              default:
                toast.error('Error getting location.');
                break;
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        )
      } else {
        toast.error('Geolocation is not supported by this browser.');
      }
    }

    // Update location immediately and then every 10 seconds
    updateLocation()
    const intervalId = setInterval(updateLocation, 10000)

    return () => clearInterval(intervalId) // Cleanup interval on component unmount
  }, [])

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API;
  
  if (!apiKey) {
    return (
      <div className='flex items-center justify-center h-full w-full bg-gray-100'>
        <div className='text-center'>
          <p className='text-red-500 font-medium'>Google Maps API key not configured</p>
          <p className='text-sm text-gray-600'>Please add VITE_GOOGLE_MAPS_API to your .env file</p>
        </div>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
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
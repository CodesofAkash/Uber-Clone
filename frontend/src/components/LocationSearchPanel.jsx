import React from 'react'
import 'remixicon/fonts/remixicon.css'
import axios from 'axios'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, pickup, setDestination, destination, activeField, setFare }) => {

    const handleSuggestionClick = (suggestion) => {
        if(activeField === 'pickup') {
            setPickup(suggestion);
        } else if(activeField === 'destination') {
            setDestination(suggestion);
        }
    }

    const findTrip = async () => {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user-token')}`
            } 
        });
        const data = await response.data;
        setFare(data);
        setVehiclePanel(true);
        setPanelOpen(false);
    }

  return (
    <div className='h-full w-full flex flex-col justify-start gap-5 mt-2'>
        <div onClick={findTrip} className='flex items-center justify-between p-2 w-[45%] bg-[#eee] rounded-2xl'>
            <img src="/time.png" className='w-4 h-4' alt="clock" />
            <span>Leave Now</span>
            <img src="/down.png" className='w-4 h-4' alt="down" />
        </div>

        <div className='flex flex-col justify-start gap-1'>
            {suggestions.map((el, i)=>(
                <div key={i} onClick={()=> handleSuggestionClick(el.description)} className='flex items-center justify-start gap-3 active:border-2 p-2 rounded-xl'>
                    <h2 className='bg-[#eee] h-8 w-8 rounded-full flex justify-center items-center'><i className='ri-map-pin-fill'></i></h2>
                    <p className='font-medium w-[84%]'>{el.description}</p>
                </div>
            ))}
        </div>
        
    </div>
  )
}

export default LocationSearchPanel

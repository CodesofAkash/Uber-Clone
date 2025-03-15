import React from 'react'
import 'remixicon/fonts/remixicon.css'

const LocationSearchPanel = (props) => {
    const locations = [
        {address: "24B, Near Kapoor's Cafe, Sherians Coding School, Bhopal"},
        {address: "20B, Near Malhotra's Cafe, Sherians Coding School, Delhi"},
        {address: "18A, Near Singhania's Cafe, Sherians Coding School, Pune"},
        {address: "22C, Near Sharma's Cafe, Sherians Coding School, Jammu"}
    ];
  return (
    <div className='h-full w-full flex flex-col justify-start gap-5 mt-2'>
        <div className='flex items-center justify-between p-2 w-[45%] bg-[#eee] rounded-2xl'>
            <img src="/time.png" className='w-4 h-4' alt="clock" />
            <span>Leave Now</span>
            <img src="/down.png" className='w-4 h-4' alt="down" />
        </div>

            {/* This is just a sample data. */}

        <div className='flex flex-col justify-start gap-1'>
            {locations.map((el, i)=>(
                <div key={i} onClick={()=>{
                    props.setVehiclePanel(true);
                    props.setPanelOpen(false);
                }} className='flex items-center justify-start gap-3 active:border-2 p-2 rounded-xl'>
                    <h2 className='bg-[#eee] h-8 w-8 rounded-full flex justify-center items-center'><i className='ri-map-pin-fill'></i></h2>
                    <p className='font-medium w-[84%]'>{el.address}</p>
                </div>
            ))}
        </div>
        
    </div>
  )
}

export default LocationSearchPanel

import React from 'react'
import { useState, useEffect } from "react";
import TimeSlot from '../components/TimeSlot';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


function SchedulePage() {
  const [SelectedSlot, setSelectedSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const timeSlots = [
    {
      id: "1",
      time: "02:00 PM",
      status: "Booked"
    },
    {
      id: "2",
      time: "02:15 PM",
      status: "Available"
    },
    {
      id: "3",
      time: "02:30 PM",
      status: "Available"
    },
    {
      id: "4",
      time: "02:45 PM",
      status: "Available"
    },
    {
      id: "5",
      time: "03:00 PM",
      status: "Booked"
    },
    {
      id: "6",
      time: "03:15 PM",
      status: "Available"
    },
    {
      id: "7",
      time: "03:30 PM",
      status: "Available"
    },
    {
      id: "8",
      time: "03:45 PM",
      status: "Available"
    },
    {
      id: "9",
      time: "04:00 PM",
      status: "Booked"
    },
    {
      id: "10",
      time: "04:15 PM",
      status: "Available"
    },
    {
      id: "11",
      time: "04:30 PM",
      status: "Booked"
    },
    {
      id: "12",
      time: "04:45 PM",
      status: "Available"
    },
    {
      id: "13",
      time: "05:00 PM",
      status: "Available"
    },
    {
      id: "14",
      time: "05:15 PM",
      status: "Available"
    },
    {
      id: "15",
      time: "05:30 PM",
      status: "Booked"
    },
    {
      id: "16",
      time: "05:45 PM",
      status: "Available"
    },
    {
      id: "17",
      time: "06:00 PM",
      status: "Booked"
    },
    {
      id: "18",
      time: "06:15 PM",
      status: "Available"
    },
    {
      id: "19",
      time: "06:30 PM",
      status: "Available"
    },
    {
      id: "20",
      time: "06:45 PM",
      status: "Available"
    },
    {
      id: "21",
      time: "07:00 PM",
      status: "Booked"
    },
    {
      id: "22",
      time: "07:15 PM",
      status: "Available"
    },
    {
      id: "23",
      time: "07:30 PM",
      status: "Booked"
    }
  ];
  
  
  
  const HandleTabClick = (id) => {
    setSelectedSlot(id);
  };
  return (
    <div className='flex flex-col gap-5 bg-[#FAFAF9] w-full  px-2 py-2 items-start justify-start text-black'>
    <div className='flex justify-around gap-2 w-full h-[100%]  items-center px-1 py-1'>

      {/* left side */}
      <div className=' flex flex-col sm:flex-wrap justify-between w-full h-full'>
        {/* header */}
        <div className=' sm:flex-wrap w-full h-[15%]'>

          {/* header 01  */}
          <div className="text-black sm:text-xl text-3xl font-bold font-['Raleway'] leading-normal">Current Session</div>
          {/* header 02  */}
          <div className='flex sm:flex-wrap justify-between '>

            {/* header date */}
            <div className="flex items-center bg-[#295567] rounded-[10px]">
              <div className="h-20 w-20 text-center"><span class="text-[#fefaf6] text-3xl font-bold font-['Raleway'] ">
                20<br/></span>
                <span class="text-[#fefaf6] text-3xl font-normal font-['Raleway'] ">Sun</span>
              </div>
            </div>

            <div className='flex flex-col items-center  justify-end'>
              <div><span class="text-[#152945] text-2xl font-bold font-['Raleway']">Totol Slots</span>
                  <span class="text-black text-2xl font-medium font-['Raleway'] "> - </span>
                  <span class="text-black text-2xl font-normal font-['Raleway'] ">172</span>
              </div>
              <div className="flex px-8 items-center justify-center h-10 bg-[#cdffcd] rounded-[10px]">
                <div><span class="text-[#295567] text-2xl lg:text-xl font-bold font-['Raleway'] ">Booked - </span>
                      <span class="text-[#295567] text-2xl lg:text-xlfont-normal font-['Raleway'] ">20</span>
                </div>
              </div>
            </div>



            <div className='flex items-end'>
              <div className="rounded-[8px] h-8 w-48 flex items-center justify-center border p-1 border-[#295567]">
              <div><span class="text-[#295567] font-semibold w-5 text-2xl lg:text-xl font-bold font-['Raleway'] leading-normal">Available - </span>
              <span class="text-[#295567] text-2xl font-normal font-['Raleway'] leading-normal">120<br/></span></div>
              </div>
            </div>
            



            <div className='flex flex-col'>
              <div className='text-4xl font-bold'>ID</div>
              <div className="text-center text-[#6394b5] text-5xl font-bold font-['Instrument Sans']">#2241206</div>
            </div>



          </div>

          

        

         
        </div>

        <div className='bg-[#f2eaf1] w-full h-[50%] grid-cols-4 grid gap-1 overflow-auto'>
        {timeSlots.map((el)=>{
          return(
            <TimeSlot
              selectedSlotId={SelectedSlot}
              timeSlot ={el}
              onClick = {HandleTabClick}
            />

          );
        })}
       
       
  
  
 
  
          
        </div>
        <div className='bg-[#edebeb] w-full h-[30%]'>
          <p>Section 01</p>
        </div>
        
      </div>

        {/* right side */}
      <div className='flex flex-col gap-2 bg-[#3gcf3b] w-[60%] h-full'>
        <div className='flex bg-[#3bff3b] w-full h-[50%]'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
        </div>
        <div className='flex bg-[#3bcf3b] w-full h-[50%]'>
        <p>Section 02</p>
     
        </div>
        </div>
    </div>

   
    
    
  </div>
    


  )
}

export default SchedulePage

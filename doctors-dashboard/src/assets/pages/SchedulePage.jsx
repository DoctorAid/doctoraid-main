import React from 'react'
import { useState, useEffect } from "react";
import TimeSlot from '../components/TimeSlot';
import { Button, TextField } from '@mui/material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function SchedulePage() {

  const [SelectedSlot, setSelectedSlot] = useState("");
  const [endTime, setEndTime] = useState(null);
  const [startingTime, setStartingTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

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
 
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [events, setEvents] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);

  

  useEffect(() => {
    // Simulating API call to fetch booked dates with events
    setTimeout(() => {
      const bookedData = [
        { date: new Date(2025, 0, 10), event: "Doctor's Appointment at 10:00 AM" },
        { date: new Date(2025, 1, 10), event: "Dental Checkup at 3:00 PM" },
        { date: new Date(2025, 0, 15), event: "Eye Test at 1:30 PM" },
        { date: new Date(2025, 0, 10), event: "Doctor's Appointment at 10:00 AM" },
        { date: new Date(2025, 1, 20), event: "Dental Checkup at 3:00 PM" },
        { date: new Date(2025, 0, 15), event: "Eye Test at 1:30 PM" },
        { date: new Date(2025, 1, 14), event: "Doctor's Appointment at 10:00 AM" },
        { date: new Date(2025, 1, 10), event: "Dental Checkup at 3:00 PM" },
        { date: new Date(2025, 1, 14), event: "Eye Test at 1:30 PM" },
      ];
  
      // Extract dates and create an event map with arrays of events
      const dateList = bookedData.map(item => item.date);
      const eventMap = bookedData.reduce((acc, item) => {
        const dateKey = item.date.toDateString();
        if (!acc[dateKey]) {
          acc[dateKey] = [];  // Initialize an array for the date
        }
        acc[dateKey].push(item.event);  // Push the event to the array
        return acc;
      }, {});
  
      setBookedDates(dateList);
      setEvents(eventMap);
    }, 1000);
  }, []);
  
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  
    const dateKey = date.toDateString();
    const eventsForDate = events[dateKey] || [];  // Get events or empty array if none
  
    setSelectedEvent(eventsForDate);
  };
  
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
                  20<br /></span>
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
                    <span class="text-[#295567] text-2xl font-normal font-['Raleway'] leading-normal">120<br /></span></div>
                </div>
              </div>

              <div className='flex flex-col'>
                <div className='text-4xl font-bold'>ID</div>
                <div className="text-center text-[#6394b5] text-5xl font-bold font-['Instrument Sans']">#2241206</div>
              </div>

            </div>

          </div>

          <div className='bg-[#f2eaf1] w-full h-[50%] grid-cols-4 grid gap-1 overflow-auto'>
            {timeSlots.map((el) => {
              return (
                <TimeSlot
                  selectedSlotId={SelectedSlot}
                  timeSlot={el}
                  onClick={HandleTabClick}
                />

              );
            })}

          </div>

          {/* section 1 */}
          <div className='bg-[#edebeb] w-full h-[30%] p-4 overflow-auto'>
            <div className='bg-white p-4 rounded-md shadow-md flex flex-col space-y-4'>
              <h3 className='text-lg font-semibold '>Booked by:</h3>
              {/* </div> */}
              {/* <div className='bg-blue-50 p-4 rounded-md flex flex-col space-y-2'> */}
              <div className='flex items-center space-x-3'>
                <div className='w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-medium'>
                  S
                </div>
                <div>
                  <p className='font-semibold text-gray-800'>Sandith Silva</p>
                  <p className='text-sm text-gray-500'>8 April, 2021 | 4.00 PM</p>
                </div>
              </div>
              <div>
                <p className='text-gray-700 font-medium'>Patient Note:</p>
                <p className='text-gray-500 italic truncate'>No additional notes provided.</p>
              </div>
              <div className='space-y-1'>
                <p className='text-gray-700'>
                  <span className='font-semibold'>Family ID:</span>
                </p>
                <p className='text-gray-700'>
                  <span className='font-semibold'>Patient ID:</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className='flex flex-col gap-2 bg-[#3gcf3b] w-[60%] h-full'>

          {/* Upper Sction */}
          <div className='flex justify-center bg-slate-400 w-full h-[50%]'>

            <div className="flex flex-col gap-2 p-4 border rounded-lg shadow-md bg-blue-50 w-[275px]">
              
              <label className="font-medium text-lg">Select a Date:</label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                highlightDates={bookedDates}
                inline
              />
              {selectedDate && (
                <p className="text-blue-600 font-medium mt-2">
                  Selected: {selectedDate.toLocaleDateString()}
                </p>
              )}
              {selectedEvent && (
                <div className="bg-gray-100 p-3 mt-2 rounded-md shadow  max-h-32 overflow-y-auto">
                  {selectedEvent && selectedEvent.length > 0 ? (
                    <ol className=" ">
                      {selectedEvent.map((event, index) => (
                        <li key={index}>{event} </li>
                      ))}
                    </ol>
                  ) : (
                    <p>No events for this date.</p>
                  )}
                </div>
              )}
            </div>
          </div>


          {/* Lower Section */}



          {/* Time Selecting Section */}
          <div className='flex bg-slate-600 gap-2'>

            <div className="flex flex-col">
              <div>
                <label className="flex font-medium">Select Start Time:</label>
              </div>
              <div>
                <DatePicker
                  selected={startingTime}
                  onChange={(time) => setStartingTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  timeCaption="Time"
                  dateFormat="HH:mm"
                  className="p-2 border rounded-lg"
                />
              </div>
              {startingTime && <p className="text-green-600">Selected: {startingTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>}
            </div>

            <div className="flex flex-col ">

              <label className="font-medium">Select End Time:</label>
              <DatePicker
                selected={endTime}
                onChange={(time) => setEndTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="HH:mm"
                className="p-2 border rounded-lg"
              />
              {endTime && <p className="text-green-600">Selected: {endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>}
            </div>

          </div>

          {/* Slot Duration Section */}
          <label className="font-medium">Select Duration:</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="p-2 border rounded-lg bg-white shadow-md"
            >
              {Array.from({ length: 6 }, (_, i) => (i + 1) * 5).map((minutes) => (
                <option key={minutes} value={minutes}>
                  {minutes} minutes
                </option>
              ))}
            </select>

              {selectedTime && (
                <p className="text-green-600 mt-2">Selected Duration: {selectedTime} minutes</p>
              )}

          {/* Submit Button */}
          <Button className='bg-slate-300'>SUBMIT</Button>

        </div>

      </div>

    </div>
  )
}

export default SchedulePage
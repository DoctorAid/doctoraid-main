import React from 'react'
import { useState, useEffect } from "react";
import TimeSlot from '../components/TimeSlot';
import { Button, TextField } from '@mui/material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Clock, Calendar, Timer } from 'lucide-react';



function SchedulePage() {

  const [SelectedSlot, setSelectedSlot] = useState("");
  const [endTime, setEndTime] = useState(null);
  const [startingTime, setStartingTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setMessage('');

    if (!selectedDate || !startingTime || !endTime || !selectedTime) {
      setMessage('Please fill in all fields');
      setLoading(false);
      return;
    }
    const formData = {
      date: selectedDate.toISOString().split('T')[0],
      startTime: startingTime.toTimeString().slice(0, 5),
      endTime: endTime.toTimeString().slice(0, 5),
      duration: selectedTime
    };

    console.log(formData);
  }


  

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
        <div className=" w-[80%] bg-gray-50 p-6">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
      <div className=" bg-white rounded-xl p-3">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Clock className="w-6 h-6 text-[#295567] " />
          Schedule Appointment
        </h1>

        {/* Date and Events Section */}
        <div className="grid md:grid-cols-2 gap-1 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center  mb-4">
              <Calendar className="w-5 h-5  text-[#295567] " />
              <label className="font-medium text-gray-700"> Select Date</label>
            </div>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              highlightDates={[new Date()]}
              inline
              className="w-full"
            />
            {selectedDate && (
              <p className="text-blue-600 font-medium mt-2">
                Selected: {selectedDate.toLocaleDateString()}
              </p>
            )}
          </div>

          <div>
            {/* Events Display */}
            {selectedEvent && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-2">Events for {selectedDate.toLocaleDateString()}</h3>
                <div className="max-h-32 overflow-y-auto">
                  {selectedEvent.length > 0 ? (
                    <ul className="space-y-2">
                      {selectedEvent.map((event, index) => (
                        <li key={index} className="text-gray-600">{event}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No events scheduled</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Time Selection Section */}
        <div className="border-t pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Timer className="w-5 h-5 text-[#295567]" />
            <h3 className="font-medium text-gray-700">Time Selection</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Start Time</label>
              <DatePicker
                selected={startingTime}
                onChange={(time) => setStartingTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="HH:mm"
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholderText="Select time"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">End Time</label>
              <DatePicker
                selected={endTime}
                onChange={(time) => setEndTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="HH:mm"
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholderText="Select time"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Duration</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Array.from({ length: 6 }, (_, i) => (i + 1) * 5).map((minutes) => (
                  <option key={minutes} value={minutes}>
                    {minutes} minutes
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-[#295567] text-white py-3 px-4 rounded-lg hover:bg-[#6394b5] transition-colors duration-200 font-medium"
          >
            Schedule Appointment
          </button>
          
        </div>
        
      </div>
      </form>
    </div>
      </div>

    </div>
  )
}


export default SchedulePage
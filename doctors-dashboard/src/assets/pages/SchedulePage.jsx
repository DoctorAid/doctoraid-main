import React from 'react'
import { useState, useEffect } from "react";
import TimeSlot from '../components/TimeSlot';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createSlots } from '../api/slotsAPI.js';
import { Clock, Calendar, Timer,CircleArrowRight,CircleArrowLeft } from 'lucide-react';
import { getAllSessions} from '../api/sessionsAPI.js';
import { getSlotsbySessionId } from '../api/slotsAPI.js';

function SchedulePage() {
  const [SelectedSlot, setSelectedSlot] = useState({});
  const [endTime, setEndTime] = useState(null);
  const [startingTime, setStartingTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState('5');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [sessions, setSessions] = useState([]);

  const [currentSlots, setCurrentSlots] = useState([]);
  const [currentSession, setCurrentSession] = useState(sessions[0]);
  const [availableSlotsCount, setAvailableSlotsCount] = useState(0);
  const [bookedSlotsCount, setBookedSlotsCount] = useState(0);
  const [daynumber, setDayNumber] = useState(0);
  const [dayname, setDayName] = useState(0);
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [events, setEvents] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [text, setText] = useState("");


  useEffect(() => {
    console.log("Loading state changed:", loading);
  }, [loading]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  
  
  setMessage('');

  if (!selectedDate || !startingTime || !endTime || !selectedTime) {
    setMessage('Please fill in all fields');
    
    return;
  }
  const pin = Math.floor(1000 + Math.random() * 9999);
  
  const formData = {
    doctorid:"12345",
    date: new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000))
       .toISOString().split('T')[0],
    startTime: startingTime.toTimeString().slice(0, 5),
    endTime: endTime.toTimeString().slice(0, 5),
    duration: selectedTime,
    text: text,
    pin: pin
  };

  console.log(formData);

  try {
    console.log(formData);
    const data = await createSlots(formData);
    console.log('Slots created:', data);
    setMessage('Slots created successfully!');

    setSelectedDate(null);
    setStartingTime(null);
    setEndTime(null);
    setSelectedTime(null);
    setText("");

  } catch (error) {
    setMessage(error.message);
  } finally {
    
  }
};


useEffect(() => {
  const fetchSessions = async () => {
    try {
      setLoading(true);
      const sessionData = await getAllSessions();
      console.log("Session data fetched:", sessionData);
      setSessions(sessionData);
      
      // Extract dates and create an event map with arrays of events
      if (sessionData && sessionData.length > 0) {
        const dateList = sessionData.map(item => new Date(item.date));
        console.log("Date List:", dateList);
        const eventMap = sessionData.reduce((acc, item) => {
          const dateKey = new Date(item.date).toDateString();
          if (!acc[dateKey]) {
            acc[dateKey] = [];
          }
          if (item.event) {
            acc[dateKey].push(item.event);
          }
          return acc;
        }, {});

        setBookedDates(dateList);
        setEvents(eventMap);
        setCurrentSession(sessionData[0]);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchSessions();
}, [])


function nextSession() {
  if (!currentSession || sessions.length === 0) return;
  const currentIndex = sessions.findIndex(session => session._id === currentSession._id);
  const nextIndex = (currentIndex + 1) % sessions.length; // Loop back to the first session if at the end
  setCurrentSession(sessions[nextIndex]);
  setSelectedSlot({});
}

function previousSession() {
  if (!currentSession || sessions.length === 0) return;
  const currentIndex = sessions.findIndex(session => session._id === currentSession._id);
  const prevIndex = (currentIndex - 1 + sessions.length) % sessions.length; // Loop to last if at first
  setCurrentSession(sessions[prevIndex]);
  setSelectedSlot({});
}

function setSlots() {

  if (!currentSession) {
    console.log("Current session is undefined");
    return; // Exit early if currentSession is not set yet
  }
  
  // const currentSlots = slots.filter((slot) => slot.sessionId === session._id);
  const bookedCount = currentSlots.filter((slot) => slot.status === "booked").length;
  const availableCount = currentSlots.filter((slot) => slot.status === "available").length;

  const dateObj = new Date(currentSession.date); 
  const dayNumber = dateObj.getDate(); // Get the day of the month
  const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });

  setDayNumber(dayNumber);
  setDayName(dayName);
  setAvailableSlotsCount(availableCount);
  setBookedSlotsCount(bookedCount);
  setCurrentSlots(currentSlots);

  console.log("Current Session:", sessions);
  console.log("Current Slots:", currentSlots);
  console.log("Booked Slots:", bookedCount);
  console.log("Available Slots:", availableCount);
  console.log(`Date Number: ${dayNumber}, Day Name: ${dayName}`); 
}

const fetchSlots = async () => {
  try {
    const slotsData = await getSlotsbySessionId(currentSession._id);
    console.log("Slots data fetched:", slotsData);
    setCurrentSlots(slotsData);
    
  } catch (error) {
    console.error('Error fetching slots:', error);
  } finally {
   
  }
};


useEffect(() => {
  if (currentSession) {  // Only run if currentSession is defined
    fetchSlots();
    // setSlots will be called after fetchSlots completes in the fetchSlots function
  }
}, [currentSession]);

useEffect(() => {
  if (currentSlots.length > 0 && currentSession) {
    setSlots();
  }
}, [currentSlots, currentSession]);



// function slotsInfo(){
 
  
//   console.log("Current Session:", currentSession);
  
//   // Get day number and day name only if currentSession has a date
//   let dayNumber = 0;
//   let dayName = '';
//   if (currentSession.date) {
//     const dateObj = new Date(currentSession.date);
//     dayNumber = dateObj.getDate();
//     dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });
//   }
  
//   const bookedSlotsCount = currentSlots.filter((slot) => slot.status === "Booked" && slot.sessionId === currentSession._id);
//   const availableSlots = currentSlots.filter((slot) => slot.status === "Available" && slot.sessionId === currentSession._id);
//   setAvailableSlotsCount(availableSlots.length);
//   setBookedSlotsCount(bookedSlotsCount.length);
  
// }
  
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  
    const dateKey = date.toDateString();
    const eventsForDate = events[dateKey] || [];  // Get events or empty array if none
  
    setSelectedEvent(eventsForDate);
  };
  
  const HandleTabClick = (el) => {
    setSelectedSlot(el);
    console.log(SelectedSlot);
  };
  
  console.log("Current Session:", currentSession);
  if(loading){
    //loading Screen
    return (<div className="flex text-9xl w-full items-center justify-center h-screen">Loading...</div>)
  }
  
  return (
    <div className='flex gap-5 bg-[#FAFAF9] w-full  px-2 py-2 items-start justify-start text-black animate-[pop_0.3s_ease-out]'>
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
                  {daynumber}<br /></span>
                  <span class="text-[#fefaf6] text-3xl font-normal font-['Raleway'] ">{dayname}</span>
                </div>
              </div>

              <div className='flex flex-col items-center  justify-end'>
                <div><span class="text-[#152945] text-2xl font-bold font-['Raleway']">Totol Slots</span>
                  <span class="text-black text-2xl font-medium font-['Raleway'] "> - </span>
                  <span class="text-black text-2xl font-normal font-['Raleway'] ">{availableSlotsCount+bookedSlotsCount}</span>
                </div>
                <div className="flex px-8 items-center justify-center h-10 bg-[#cdffcd] rounded-[10px]">
                  <div><span class="text-[#295567] text-2xl lg:text-xl font-bold font-['Raleway'] ">Booked - </span>
                    <span class="text-[#295567] text-2xl lg:text-xlfont-normal font-['Raleway'] ">{bookedSlotsCount}</span>
                  </div>
                </div>
              </div>

              <div className='flex items-end'>
                <div className="rounded-[8px] h-8 w-48 flex items-center justify-center border p-1 border-[#295567]">
                  <div><span class="text-[#295567] font-semibold w-5 text-2xl lg:text-xl font-bold font-['Raleway'] leading-normal">Available - </span>
                    <span class="text-[#295567] text-2xl font-normal font-['Raleway'] leading-normal">{availableSlotsCount}<br /></span></div>
                </div>
              </div>

              <div className='flex flex-col'>
                <div className='text-4xl font-bold'>ID</div>
                <div className="text-center text-[#6394b5] text-5xl font-bold font-['Instrument Sans']">#{!loading?currentSession._id.slice(-6):"0"}</div>
              </div>
              <CircleArrowLeft className="w-8 h-8 text-[#295567] cursor-pointer" onClick={previousSession} />
              <CircleArrowRight className="w-8 h-8 text-[#295567] cursor-pointer" onClick={nextSession} />

            </div>

          </div>

          <div className='bg-[#f2eaf1] w-full h-[50%] grid-cols-4 grid gap-1 overflow-auto'>
            {!currentSlots.length ? "No Slots Available" : currentSlots.map((el) => {
              return (
                <TimeSlot
                  selectedSlotId={SelectedSlot?._id}
                  timeSlot={el}
                  onClick={() => HandleTabClick(el)}
                />

              );
            })}
          </div>

          {/* Patient's detail section */}
          <div className='bg-[#edebeb] w-full h-[30%] p-4 overflow-auto'>
            <div className='bg-white p-4 rounded-md shadow-md flex flex-col space-y-4'>
              <h3 className='text-lg font-semibold '>Booked by:</h3>
              <div className='flex items-center space-x-3'>
                <div className='w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-medium'>
                  S
                </div>
                <div>
                  <p className='font-semibold text-gray-800'>{SelectedSlot.patientName}</p>
                  <p className='text-sm text-gray-500'>{SelectedSlot.startTime}-{SelectedSlot.endTime}</p>
                </div>
              </div>
              <div>
                <p className='text-gray-700 font-medium'>Patient Note:</p>
                <p className='text-gray-500 italic truncate'>{SelectedSlot.patientNote}</p>
              </div>
              <div className='space-y-1'>
                <p className='text-gray-700'>
                  <span className='font-semibold'>Family ID:{SelectedSlot.familyId}</span>
                </p>
                <p className='text-gray-700'>
                  <span className='font-semibold'>Patient ID:{SelectedSlot.patientId}</span>
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
                      highlightDates={bookedDates}
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
                    {selectedEvent && selectedDate && (
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
        <div className=" gap-4 flex flex-col border-t pt-6">

          {/*Title and Logo */}
          <div className="flex items-center gap-2 mb-4">
            <Timer className="w-5 h-5 text-[#295567]" />
            <h3 className="font-medium text-gray-700">Time Selection</h3>
          </div>
          
          {/* Start time , end time and duration picker */}
          <div className="grid md:grid-cols-3 gap-4">
            
           <div>  {/*  Start time picker */}
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

            <div> {/*  End time picker */}
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

            <div> {/*  Duration picker */}
              <label className="block text-sm text-gray-600 mb-1">Duration</label>
              <select
                value={selectedTime || ''}
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

          <div> {/* Session label */}
              <input
                  type="text"
                  id="textInput"
                  className="w-full border-[#000000] rounded-lg p-2 "
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type your session name here"
                />
          </div>

        </div>

        

        <div className="mt-6">
          <button  className="w-full bg-[#295567] text-white py-3 px-4 rounded-lg hover:bg-[#6394b5] transition-colors duration-200 font-medium"
            type="submit" 
          >
            Schedule Appointment
          </button>
          <p>{message}</p>
        </div>
        
      </div>
      </form>
    </div>
      </div>

    </div>
  )
}


export default SchedulePage
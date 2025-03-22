import React from 'react'
import { useState, useEffect } from "react";
import TimeSlot from '../components/TimeSlot';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createSlots } from '../api/slotsAPI.js';
import { Clock, Calendar, Timer, CircleArrowRight, CircleArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllSessions } from '../api/sessionsAPI.js';
import { getSessionsByDocId } from '../api/sessionsAPI.js';
import { getSlotsbySessionId } from '../api/slotsAPI.js';
import { useUser } from '@clerk/clerk-react'

function SchedulePage() {
  const [SelectedSlot, setSelectedSlot] = useState({});
  const [endTime, setEndTime] = useState(null);
  const [startingTime, setStartingTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState('5');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [sessions, setSessions] = useState([]);

  const [currentSlots, setCurrentSlots] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [availableSlotsCount, setAvailableSlotsCount] = useState(0);
  const [bookedSlotsCount, setBookedSlotsCount] = useState(0);
  const [daynumber, setDayNumber] = useState(0);
  const [dayname, setDayName] = useState(0);
  
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [events, setEvents] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [text, setText] = useState("");

  const { user } = useUser();
  
  const clerkId = user ? user.id : null;
  console.log("clerkId is:", clerkId);

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
      doctorid: clerkId,
      date: new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000))
        .toISOString().split('T')[0],
      startTime: startingTime.toTimeString().slice(0, 5),
      endTime: endTime.toTimeString().slice(0, 5),
      duration: selectedTime,
      event: text,
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
    }
  };

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        const sessionData = await getSessionsByDocId(clerkId);
        console.log("Session data fetched:", sessionData);
        setSessions(sessionData);
        
        if (sessionData && sessionData.length >= 0) {
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
    const nextIndex = (currentIndex + 1) % sessions.length;
    setCurrentSession(sessions[nextIndex]);
    setSelectedSlot({});
  }

  function previousSession() {
    if (!currentSession || sessions.length === 0) return;
    const currentIndex = sessions.findIndex(session => session._id === currentSession._id);
    const prevIndex = (currentIndex - 1 + sessions.length) % sessions.length;
    setCurrentSession(sessions[prevIndex]);
    setSelectedSlot({});
  }

  function setSlots() {
    if (!currentSession) {
      console.log("Current session is undefined");
      return;
    }
    
    const bookedCount = currentSlots.filter((slot) => slot.status === "booked").length;
    const availableCount = currentSlots.filter((slot) => slot.status === "available").length;

    const dateObj = new Date(currentSession.date); 
    const dayNumber = dateObj.getDate();
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
    }
  };

  useEffect(() => {
    if (currentSession) {
      fetchSlots();
    }
  }, [currentSession]);

  useEffect(() => {
    if (currentSlots.length > 0 && currentSession) {
      setSlots();
    }
  }, [currentSlots, currentSession]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  
    const dateKey = date.toDateString();
    const eventsForDate = events[dateKey] || [];
  
    setSelectedEvent(eventsForDate);
  };
  
  const HandleTabClick = (el) => {
    setSelectedSlot(el);
    console.log(SelectedSlot);
  };
  
  console.log("Current Session:", currentSession);
  if(loading){
    return (
      <div className="flex text-3xl w-full items-center justify-center h-screen font-['Raleway']">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }
  
  if(loading){
    return (
      <div className="flex items-center justify-center h-full w-full bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#295567]"></div>
      </div>
    )
  }
  
  return (
    <div className="flex h-full w-full bg-[#FAFAF9] overflow-hidden font-['Raleway'] animate-pageTransition">
      {/* Left side - Session info and slots */}
      <div className="w-3/5 h-full border-r border-gray-200 bg-white rounded-tl-3xl shadow-md flex flex-col">
        {/* Header with session info */}
        <div className="p-4 border-b border-gray-200 bg-white rounded-tl-3xl">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg text-gray-800">Current Session</h2>
            <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
              ID: #{!loading && currentSession?._id ? currentSession._id.slice(-6) : "0"}
            </span>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            {/* Date and session stats */}
            <div className="flex items-center gap-4">
              {/* Date display */}
              <div className="flex flex-col items-center justify-center bg-[#295567] text-white rounded-lg w-14 h-14">
                <span className="text-xl font-bold">{daynumber}</span>
                <span className="text-xs">{dayname}</span>
              </div>
              
              {/* Stats */}
              <div className="flex gap-2">
                <span className="px-2 py-0.5 bg-[#295567]/10 rounded-lg text-xs font-medium text-[#295567]">
                  Total: {availableSlotsCount+bookedSlotsCount}
                </span>
                <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-lg text-xs">
                  Booked: {bookedSlotsCount}
                </span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-lg text-xs">
                  Available: {availableSlotsCount}
                </span>
              </div>
            </div>
            
            {/* Session navigation */}
            <div className="flex space-x-2">
              <button onClick={previousSession} className="p-1 hover:bg-gray-100 rounded-full transition text-[#295567]">
                <CircleArrowLeft size={20} />
              </button>
              <button onClick={nextSession} className="p-1 hover:bg-gray-100 rounded-full transition text-[#295567]">
                <CircleArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Slots grid - Smaller height */}
        <div className="h-[40%] overflow-auto bg-white">
          <div className="sticky top-0 bg-white z-10 p-3 border-b flex justify-between items-center">
            <h2 className="text-sm font-semibold text-gray-700 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-[#295567]" />
              Available Time Slots
            </h2>
            <div className="text-xs text-gray-500 bg-[#295567]/5 px-2 py-1 rounded-lg">
              {currentSlots.length} slots in total
            </div>
          </div>
          
          {!currentSlots.length ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6">
              <Clock className="w-12 h-12 mb-2 opacity-30" />
              <p className="text-gray-500 animate-pulse">No Slots Available</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-3">
              {currentSlots.map((el, index) => (
                <div 
                  key={el._id}
                  className={`relative overflow-hidden rounded-lg border cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                    SelectedSlot?._id === el._id 
                      ? "border-[#295567] shadow-md bg-[#295567]/5" 
                      : "border-gray-200 hover:border-[#295567]/50 bg-white"
                  }`}
                  onClick={() => HandleTabClick(el)}
                  style={{
                    animationName: 'fadeInUp',
                    animationDuration: '0.4s',
                    animationDelay: `${index * 0.03}s`,
                    animationFillMode: 'both'
                  }}
                >
                  {/* Status indicator */}
                  <div className={`absolute top-0 left-0 w-full h-1 ${
                    el.status === "booked" 
                      ? "bg-red-400" 
                      : "bg-green-400"
                  }`}></div>
                  
                  {/* Time display */}
                  <div className="p-2 text-center">
                    <p className="text-xs font-semibold text-gray-800">
                      {el.startTime} - {el.endTime}
                    </p>
                    <p className={`text-xs mt-1 ${
                      el.status === "booked" 
                        ? "text-red-600 font-medium" 
                        : "text-green-600 font-medium"
                    }`}>
                      {el.status === "booked" ? "Booked" : "Available"}
                    </p>
                  </div>
                  
                  {/* Selection indicator */}
                  {SelectedSlot?._id === el._id && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#295567] rounded-tl-lg flex items-center justify-center animate-pulse">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Patient details section */}
        <div className="border-t bg-white p-4 flex-grow overflow-auto">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold text-gray-700">Patient Details</h2>
            {SelectedSlot && SelectedSlot._id && (
              <span className="px-2 py-0.5 bg-[#295567]/10 rounded-lg text-xs font-medium text-[#295567]">
                Slot #{SelectedSlot._id?.slice(-4) || 'N/A'}
              </span>
            )}
          </div>
          
          {SelectedSlot && SelectedSlot._id ? (
            <div className="bg-[#FAFAF9] p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 flex-shrink-0 rounded-full flex items-center justify-center text-sm font-medium bg-[#295567] text-white mr-3">
                  {SelectedSlot.patientName ? SelectedSlot.patientName.charAt(0) : 'S'}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{SelectedSlot.patientName || 'Not assigned'}</p>
                  <p className="text-xs text-gray-500">{SelectedSlot.startTime} - {SelectedSlot.endTime}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="mb-1 text-xs font-medium text-gray-500">Patient Note:</div>
                <div className="p-3 bg-white rounded-lg border border-gray-100 text-sm">
                  {SelectedSlot.patientNote || 'No notes available'}
                </div>
              </div>
              
              <div className="pt-3 border-t border-gray-200 grid grid-cols-2 gap-3">
                <div className="p-2 bg-white rounded-lg border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1">Family ID</div>
                  <div className="text-sm font-medium">{SelectedSlot.familyId || 'N/A'}</div>
                </div>
                <div className="p-2 bg-white rounded-lg border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1">Patient ID</div>
                  <div className="text-sm font-medium">{SelectedSlot.patientId || 'N/A'}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#FAFAF9] rounded-xl p-4 border border-gray-100 text-center shadow-sm flex flex-col items-center justify-center h-48">
              <div className="text-[#295567]/30 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <p className="text-gray-500 text-sm">Select a slot to view patient details</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Right side - Scheduling form */}
      <div className="w-2/5 h-full bg-[#FAFAF9]">
        <form onSubmit={handleSubmit} className="h-full overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#295567] to-[#295567]/80 px-4 py-4 border-b border-[#295567]/40 shadow-md rounded-tr-3xl">
            <h1 className="text-lg font-bold text-white flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Schedule Appointment
            </h1>
          </div>
          
          {/* Form content */}
          <div className="p-4 flex-grow overflow-auto space-y-4">
            {/* Date picker and events section */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Date picker section */}
              <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                <div className="flex items-center mb-2">
                  <Calendar className="w-4 h-4 text-[#295567] mr-2" />
                  <label className="font-medium text-sm">Select Date</label>
                </div>
                <div className="flex justify-center">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    highlightDates={bookedDates}
                    inline
                    className="w-full"
                  />
                </div>
                {selectedDate && (
                  <p className="text-[#295567] font-medium mt-1 text-sm">
                    Selected: {selectedDate.toLocaleDateString()}
                  </p>
                )}
              </div>
              
              {/* Events display */}
              <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex flex-col">
                <div className="flex items-center mb-2">
                  <Calendar className="w-4 h-4 text-[#295567] mr-2" />
                  <span className="font-medium text-sm">Events</span>
                </div>
                
                {selectedEvent && selectedDate ? (
                  <div className="bg-[#FAFAF9] p-3 rounded-xl flex-grow border border-gray-100">
                    <h3 className="font-medium mb-2 text-sm">
                      For {selectedDate.toLocaleDateString()}
                    </h3>
                    <div className="max-h-40 overflow-y-auto">
                      {selectedEvent.length > 0 ? (
                        <ul className="space-y-1">
                          {selectedEvent.map((event, index) => (
                            <li key={index} className="p-2 bg-white rounded-lg text-sm border border-gray-100">
                              {event}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 p-2 text-sm">No events scheduled</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full bg-[#FAFAF9] rounded-xl flex-grow border border-gray-100">
                    <p className="text-gray-500 text-sm">Select a date to view events</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Time selection section */}
            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
              <div className="flex items-center mb-3">
                <Timer className="w-4 h-4 text-[#295567] mr-2" />
                <h3 className="font-medium text-sm">Time Selection</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-3 mb-3">
                {/* Start time */}
                <div>
                  <label className="block text-xs mb-1 text-gray-500">Start Time</label>
                  <DatePicker
                    selected={startingTime}
                    onChange={(time) => setStartingTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="HH:mm"
                    className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring focus:ring-[#295567]/20 focus:border-[#295567]"
                    placeholderText="Select time"
                  />
                </div>
                
                {/* End time */}
                <div>
                  <label className="block text-xs mb-1 text-gray-500">End Time</label>
                  <DatePicker
                    selected={endTime}
                    onChange={(time) => setEndTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="HH:mm"
                    className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring focus:ring-[#295567]/20 focus:border-[#295567]"
                    placeholderText="Select time"
                  />
                </div>
                
                {/* Duration */}
                <div>
                  <label className="block text-xs mb-1 text-gray-500">Duration</label>
                  <select
                    value={selectedTime || ''}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring focus:ring-[#295567]/20 focus:border-[#295567]"
                  >
                    {Array.from({ length: 6 }, (_, i) => (i + 1) * 5).map((minutes) => (
                      <option key={minutes} value={minutes}>
                        {minutes} minutes
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Session name */}
              <div>
                <label className="block text-xs mb-1 text-gray-500">Session Name</label>
                <input
                  type="text"
                  className="w-full p-2 text-sm border border-gray-200 rounded-lg focus:ring focus:ring-[#295567]/20 focus:border-[#295567]"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type your session name here"
                />
              </div>
            </div>
          </div>
          
          {/* Footer with submit button */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <button 
              className="w-full bg-[#295567] text-white py-2 px-4 rounded-lg hover:bg-[#295567]/90 transition-colors duration-200 font-medium"
              type="submit"
            >
              Schedule Appointment
            </button>
            
            {/* Message display */}
            {message && (
              <div className={`mt-2 p-2 rounded text-sm ${message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message}
              </div>
            )}
          </div>
        </form>
      </div>
      
      {/* Add animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes pageTransition {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

export default SchedulePage
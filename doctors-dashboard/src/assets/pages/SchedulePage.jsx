import React from 'react'
import { useState, useEffect } from "react";
import TimeSlot from '../components/TimeSlot';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createSlots } from '../api/slotsAPI.js';
import { Clock, Calendar, Timer,CircleArrowRight,CircleArrowLeft } from 'lucide-react';


function SchedulePage() {

  const [SelectedSlot, setSelectedSlot] = useState({});
  const [endTime, setEndTime] = useState(null);
  const [startingTime, setStartingTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

 

 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sessions = [
    { _id: "67a8c7eec9bf90242a504f3d", date: "2025-02-14T00:00:00.000+00:00", event: "Morning Session at 10:00 AM" },
    { _id: "67a8c7eec9bf90242a504f44", date: "2025-02-15T00:00:00.000+00:00", event: "Afternoon Session at 1:30 PM" },
    { _id: "67a8c7eec9bf90242a504f4b", date: "2025-02-16T00:00:00.000+00:00", event: "Evening Session at 3:00 PM" }
  ];

  const slots = [
    // Slots for session 1 (2025-02-14)
    {
      "_id": "67a8c7efc9bf90242a504f3f",
      "sessionId": "67a8c7eec9bf90242a504f3d",
      "startTime": "09:00 AM",
      "endTime": "09:05 AM",
      "duration": 5,
      "status": "available"
    },
    {
      "_id": "67a8c7efc9bf90242a504f40",
      "sessionId": "67a8c7eec9bf90242a504f3d",
      "startTime": "09:05 AM",
      "endTime": "09:10 AM",
      "duration": 5,
      "status": "booked",
      "patientNote": "Fever and headache",
      "familyId": "F101",
      "patientId": "P101",
      "patientName": "Alice Smith"
    },
    {
      "_id": "67a8c7efc9bf90242a504f41",
      "sessionId": "67a8c7eec9bf90242a504f3d",
      "startTime": "09:10 AM",
      "endTime": "09:15 AM",
      "duration": 5,
      "status": "available"
    },
    {
      "_id": "67a8c7efc9bf90242a504f42",
      "sessionId": "67a8c7eec9bf90242a504f3d",
      "startTime": "09:15 AM",
      "endTime": "09:20 AM",
      "duration": 5,
      "status": "booked",
      "patientNote": "Cough and cold",
      "familyId": "F102",
      "patientId": "P102",
      "patientName": "Bob Johnson"
    },
    {
      "_id": "67a8c7efc9bf90242a504f43",
      "sessionId": "67a8c7eec9bf90242a504f3d",
      "startTime": "09:20 AM",
      "endTime": "09:25 AM",
      "duration": 5,
      "status": "available"
    },
    {
      "_id": "67a8c7efc9bf90242a504f44",
      "sessionId": "67a8c7eec9bf90242a504f3d",
      "startTime": "09:25 AM",
      "endTime": "09:30 AM",
      "duration": 5,
      "status": "booked",
      "patientNote": "Chest pain",
      "familyId": "F103",
      "patientId": "P103",
      "patientName": "Mary Evans"
    },
    {
      "_id": "67a8c7efc9bf90242a504f45",
      "sessionId": "67a8c7eec9bf90242a504f3d",
      "startTime": "09:30 AM",
      "endTime": "09:35 AM",
      "duration": 5,
      "status": "available"
    },
    {
      "_id": "67a8c7efc9bf90242a504f46",
      "sessionId": "67a8c7eec9bf90242a504f3d",
      "startTime": "09:35 AM",
      "endTime": "09:40 AM",
      "duration": 5,
      "status": "booked",
      "patientNote": "Flu-like symptoms",
      "familyId": "F104",
      "patientId": "P104",
      "patientName": "John Doe"
    },
    {
      "_id": "67a8c7efc9bf90242a504f47",
      "sessionId": "67a8c7eec9bf90242a504f3d",
      "startTime": "09:40 AM",
      "endTime": "09:45 AM",
      "duration": 5,
      "status": "available"
    },
    {
      "_id": "67a8c7efc9bf90242a504f48",
      "sessionId": "67a8c7eec9bf90242a504f3d",
      "startTime": "09:45 AM",
      "endTime": "09:50 AM",
      "duration": 5,
      "status": "booked",
      "patientNote": "Skin rash",
      "familyId": "F105",
      "patientId": "P105",
      "patientName": "James Williams"
    },
    {
      "_id": "67a8c7efc9bf90242a504f49",
      "sessionId": "67a8c7eec9bf90242a504f3d",
      "startTime": "09:50 AM",
      "endTime": "09:55 AM",
      "duration": 5,
      "status": "available"
    },
    {
      "_id": "67a8c7efc9bf90242a504f4a",
      "sessionId": "67a8c7eec9bf90242a504f3d",
      "startTime": "09:55 AM",
      "endTime": "10:00 AM",
      "duration": 5,
      "status": "booked",
      "patientNote": "Headache and nausea",
      "familyId": "F106",
      "patientId": "P106",
      "patientName": "Sophie Clark"
    },
    {
      "_id": "67a8c7efc9bf90242a504f4b",
      "sessionId": "67a8c7eec9bf90242a504f3d",
      "startTime": "10:00 AM",
      "endTime": "10:05 AM",
      "duration": 5,
      "status": "available"
    },
    {
      "_id": "67a8c7efc9bf90242a504f4c",
      "sessionId": "67a8c7eec9bf90242a504f3d",
      "startTime": "10:05 AM",
      "endTime": "10:10 AM",
      "duration": 5,
      "status": "booked",
      "patientNote": "Diabetes management",
      "familyId": "F107",
      "patientId": "P107",
      "patientName": "Peter Parker"
    },
    {
      "_id": "67a8c7efc9bf90242a504f4d",
      "sessionId": "67a8c7eec9bf90242a504f3d",
      "startTime": "10:10 AM",
      "endTime": "10:15 AM",
      "duration": 5,
      "status": "available"
    },
    {
      "_id": "67a8c7efc9bf90242a504f4e",
      "sessionId": "67a8c7eec9bf90242a504f3d",
      "startTime": "10:15 AM",
      "endTime": "10:20 AM",
      "duration": 5,
      "status": "booked",
      "patientNote": "Arthritis checkup",
      "familyId": "F108",
      "patientId": "P108",
      "patientName": "Linda Johnson"
    },
    {
      "_id": "67a8c7efc9bf90242a504f4f",
      "sessionId": "67a8c7eec9bf90242a504f3d",
      "startTime": "10:20 AM",
      "endTime": "10:25 AM",
      "duration": 5,
      "status": "available"
    },
    {
      "_id": "67a8c7efc9bf90242a504f50",
      "sessionId": "67a8c7eec9bf90242a504f3d",
      "startTime": "10:25 AM",
      "endTime": "10:30 AM",
      "duration": 5,
      "status": "booked",
      "patientNote": "Post-surgery follow-up",
      "familyId": "F109",
      "patientId": "P109",
      "patientName": "Chris Hemsworth"
    },
    {
      "_id": "67a8c7efc9bf90242a504f51",
      "sessionId": "67a8c7eec9bf90242a504f3d",
      "startTime": "10:30 AM",
      "endTime": "10:35 AM",
      "duration": 5,
      "status": "available"
    },
  
    // Slots for session 2 (2025-02-15)
    {
      "_id": "67a8c7efc9bf90242a504f52",
      "sessionId": "67a8c7eec9bf90242a504f44",
      "startTime": "09:00 AM",
      "endTime": "09:05 AM",
      "duration": 5,
      "status": "available"
    },
    {
      "_id": "67a8c7efc9bf90242a504f53",
      "sessionId": "67a8c7eec9bf90242a504f44",
      "startTime": "09:05 AM",
      "endTime": "09:10 AM",
      "duration": 5,
      "status": "booked",
      "patientNote": "Regular checkup",
      "familyId": "F201",
      "patientId": "P201",
      "patientName": "Charlie Brown"
    },
    {
      "_id": "67a8c7efc9bf90242a504f54",
      "sessionId": "67a8c7eec9bf90242a504f44",
      "startTime": "09:10 AM",
      "endTime": "09:15 AM",
      "duration": 5,
      "status": "available"
    },
    {
      "_id": "67a8c7efc9bf90242a504f55",
      "sessionId": "67a8c7eec9bf90242a504f44",
      "startTime": "09:15 AM",
      "endTime": "09:20 AM",
      "duration": 5,
      "status": "booked",
      "patientNote": "Blood pressure check",
      "familyId": "F202",
      "patientId": "P202",
      "patientName": "Diana Prince"
    },
    {
      "_id": "67a8c7efc9bf90242a504f56",
      "sessionId": "67a8c7eec9bf90242a504f44",
      "startTime": "09:20 AM",
      "endTime": "09:25 AM",
      "duration": 5,
      "status": "available"
    },
    {
      "_id": "67a8c7efc9bf90242a504f57",
      "sessionId": "67a8c7eec9bf90242a504f44",
      "startTime": "09:25 AM",
      "endTime": "09:30 AM",
      "duration": 5,
      "status": "booked",
      "patientNote": "Routine checkup",
      "familyId": "F203",
      "patientId": "P203",
      "patientName": "Ethan Hunt"
    },
    {
      "_id": "67a8c7efc9bf90242a504f58",
      "sessionId": "67a8c7eec9bf90242a504f44",
      "startTime": "09:30 AM",
      "endTime": "09:35 AM",
      "duration": 5,
      "status": "available"
    },
    {
      "_id": "67a8c7efc9bf90242a504f59",
      "sessionId": "67a8c7eec9bf90242a504f44",
      "startTime": "09:35 AM",
      "endTime": "09:40 AM",
      "duration": 5,
      "status": "booked",
      "patientNote": "Consultation",
      "familyId": "F204",
      "patientId": "P204",
      "patientName": "Fiona Gallagher"
    },
    {
      "_id": "67a8c7efc9bf90242a504f5a",
      "sessionId": "67a8c7eec9bf90242a504f44",
      "startTime": "09:40 AM",
      "endTime": "09:45 AM",
      "duration": 5,
      "status": "available"
    },
    {
      "_id": "67a8c7efc9bf90242a504f5b",
      "sessionId": "67a8c7eec9bf90242a504f44",
      "startTime": "09:45 AM",
      "endTime": "09:50 AM",
      "duration": 5,
      "status": "booked",
      "patientNote": "Health screening",
      "familyId": "F205",
      "patientId": "P205",
      "patientName": "Gabriel Reyes"
    },
    {
      "_id": "67a8c7efc9bf90242a504f5c",
      "sessionId": "67a8c7eec9bf90242a504f44",
      "startTime": "09:50 AM",
      "endTime": "09:55 AM",
      "duration": 5,
      "status": "available"
    },
    {
      "_id": "67a8c7efc9bf90242a504f5d",
      "sessionId": "67a8c7eec9bf90242a504f44",
      "startTime": "09:55 AM",
      "endTime": "10:00 AM",
      "duration": 5,
      "status": "booked",
      "patientNote": "Blood test review",
      "familyId": "F206",
      "patientId": "P206",
      "patientName": "Olivia Wilde"
    },
    {
      "_id": "67a8c7efc9bf90242a504f5e",
      "sessionId": "67a8c7eec9bf90242a504f44",
      "startTime": "10:00 AM",
      "endTime": "10:05 AM",
      "duration": 5,
      "status": "available"
    },
    {
      "_id": "67a8c7efc9bf90242a504f60",
      "sessionId": "67a8c7eec9bf90242a504f4b",
      "startTime": "09:00 AM",
      "endTime": "09:05 AM",
      "duration": 5,
      "status": "available"
    },
    {
      "_id": "67a8c7efc9bf90242a504f61",
      "sessionId": "67a8c7eec9bf90242a504f4b",
      "startTime": "09:05 AM",
      "endTime": "09:10 AM",
      "duration": 5,
      "status": "booked",
      "patientNote": "Back pain",
      "familyId": "F301",
      "patientId": "P301",
      "patientName": "Tom Hanks"
    },
    {
      "_id": "67a8c7efc9bf90242a504f62",
      "sessionId": "67a8c7eec9bf90242a504f4b",
      "startTime": "09:10 AM",
      "endTime": "09:15 AM",
      "duration": 5,
      "status": "available"
    },
    {
      "_id": "67a8c7efc9bf90242a504f63",
      "sessionId": "67a8c7eec9bf90242a504f4b",
      "startTime": "09:15 AM",
      "endTime": "09:20 AM",
      "duration": 5,
      "status": "booked",
      "patientNote": "Fever and chills",
      "familyId": "F302",
      "patientId": "P302",
      "patientName": "Emma Stone"
    },
    {
      "_id": "67a8c7efc9bf90242a504f64",
      "sessionId": "67a8c7eec9bf90242a504f4b",
      "startTime": "09:20 AM",
      "endTime": "09:25 AM",
      "duration": 5,
      "status": "available"
    },
    {
      "_id": "67a8c7efc9bf90242a504f65",
      "sessionId": "67a8c7eec9bf90242a504f4b",
      "startTime": "09:25 AM",
      "endTime": "09:30 AM",
      "duration": 5,
      "status": "booked",
      "patientNote": "Headaches",
      "familyId": "F303",
      "patientId": "P303",
      "patientName": "Ryan Reynolds"
    },
    {
      "_id": "67a8c7efc9bf90242a504f66",
      "sessionId": "67a8c7eec9bf90242a504f4b",
      "startTime": "09:30 AM",
      "endTime": "09:35 AM",
      "duration": 5,
      "status": "available"
    },
    {
      "_id": "67a8c7efc9bf90242a504f67",
      "sessionId": "67a8c7eec9bf90242a504f4b",
      "startTime": "09:35 AM",
      "endTime": "09:40 AM",
      "duration": 5,
      "status": "booked",
      "patientNote": "Stomach cramps",
      "familyId": "F304",
      "patientId": "P304",
      "patientName": "Scarlett Johansson"
    },
    {
      "_id": "67a8c7efc9bf90242a504f68",
      "sessionId": "67a8c7eec9bf90242a504f4b",
      "startTime": "09:40 AM",
      "endTime": "09:45 AM",
      "duration": 5,
      "status": "available"
    },
    {
      "_id": "67a8c7efc9bf90242a504f69",
      "sessionId": "67a8c7eec9bf90242a504f4b",
      "startTime": "09:45 AM",
      "endTime": "09:50 AM",
      "duration": 5,
      "status": "booked",
      "patientNote": "Allergy consultation",
      "familyId": "F305",
      "patientId": "P305",
      "patientName": "Chris Evans"
    }
    
  ] 

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

  const [currentSlots, setCurrentSlots] = useState([]);
  const [currentSession, setCurrentSession] = useState(sessions[0]);
  const [availableSlotsCount, setAvailableSlotsCount] = useState(0);
  const [bookedSlotsCount, setBookedSlotsCount] = useState(0);
  const [daynumber, setDayNumber] = useState(0);
  const [dayname, setDayName] = useState(0);
  

  function nextSession() {
    const currentIndex = sessions.findIndex(session => session._id === currentSession._id);
    const nextIndex = (currentIndex + 1) % sessions.length; // Loop back to the first session if at the end
    setCurrentSession(sessions[nextIndex]);
    
    
  }

  function previousSession() {
    const currentIndex = sessions.findIndex(session => session._id === currentSession._id);
    const prevIndex = (currentIndex - 1 + sessions.length) % sessions.length; // Loop to last if at first
    setCurrentSession(sessions[prevIndex]);
  }

  function setSlots(session) {
    const sessionSlots = slots.filter((slot) => slot.sessionId === session._id);
    const bookedCount = sessionSlots.filter((slot) => slot.status === "booked").length;
    const availableCount = sessionSlots.filter((slot) => slot.status === "available").length;

    const dateObj = new Date(currentSession.date); 
    const dayNumber = dateObj.getDate(); // Get the day of the month
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });
    
    setDayNumber(dayNumber)
    setDayName(dayName) 
    setAvailableSlotsCount(availableCount);
    setBookedSlotsCount(bookedCount);
    setCurrentSlots(sessionSlots);

    console.log("Current Session:", currentSession);
    console.log("Current Slots:", currentSlots);
    console.log("Booked Slots:", bookedSlotsCount);
    console.log("Available Slots:", availableSlotsCount);
    console.log(`Date Number: ${dayNumber}, Day Name: ${dayName}`); 
   
  }
  

  useEffect(() => {
    setSlots(currentSession);
  }, [currentSession]);



  function slotsInfo(){
    const bookedSlotsCount = currentSlots.filter((slot) => slot.status === "Booked" && slot.sessionId === currentSession._id);
    const availableSlots = currentSlots.filter((slot) => slot.status === "Available" && slot.sessionId === currentSession._id);
    setAvailableSlotsCount(availableSlots.length);
    setBookedSlotsCount(bookedSlotsCount.length);
    
  }

 
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [events, setEvents] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [text, setText] = useState("");

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
    duration: selectedTime,
    text: text
  };

  console.log(formData);

  try {
    const data = await createSlots(formData);
    console.log('Slots created:', data);
    setMessage('Slots created successfully!');
  } catch (error) {
    setMessage(error.message);
  } finally {
    setLoading(false);
  }
}


useEffect(() => {
  // Simulating API call to fetch booked dates with events
  setTimeout(() => {
    const bookedData = sessions;

    console.log('Booked data:', bookedData);

    // Extract dates and create an event map with arrays of events
    const dateList = bookedData.map(item => new Date(item.date));
    const eventMap = bookedData.reduce((acc, item) => {
      const dateKey = new Date(item.date).toDateString();
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(item.event);
      return acc;
    }, {});

    console.log(dateList);

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
  
  const HandleTabClick = (el) => {
    setSelectedSlot(el);
    console.log(SelectedSlot);
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
                <div className="text-center text-[#6394b5] text-5xl font-bold font-['Instrument Sans']">#{currentSession._id.slice(-6)}</div>
              </div>
              <CircleArrowLeft className="w-8 h-8 text-[#295567] cursor-pointer" onClick={previousSession} />
              <CircleArrowRight className="w-8 h-8 text-[#295567] cursor-pointer" onClick={nextSession} />

            </div>

          </div>

          <div className='bg-[#f2eaf1] w-full h-[50%] grid-cols-4 grid gap-1 overflow-auto'>
            {currentSlots.map((el) => {
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
import React, { useState, useEffect } from 'react';
import DashboardNavigation from '../page_sections/dashboard/DashboardNavigation';
import { SignOutButton } from '@clerk/clerk-react';
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import PatientCardType1 from '../components/PatientCardType1';
import PatientCardType2 from '../components/PatientCardType2';
import SessionInfo from '../components/SessionInfo';
import PatientDetailsCardType1 from '../components/PatientDetailsCardType1';
import { io } from "socket.io-client";
// import { createRecord, getRecordsByPatient, getRecordsByPatientAndDoctor } from '../api/recordsAPI.js';
import { createRecord } from '../api/recordsAPI';
import { getSlotsbySessionId } from '../api/slotsAPI';
import MedicinesPage from './MedicinesPage';

function App() {
  // State variables
  const [loading, setLoading] = useState(false);
  const [patientRecords, setPatientRecords] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [doctorId, setDoctorId] = useState("12345"); // This would typically come from auth
  const [limit, setLimit] = useState(10);
  const [currentSlots, setCurrentSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSession, setSelectedSession] = useState({});

  // Current user information
  const { user } = useUser();
  const _id = "67d8f3b6df847e7d9cbc2626";

  const socket = io("http://localhost:5000", {    //Socket initialization
    transports: ["websocket"],
    reconnectionAttempts: 5, // Try 5 times before stopping
    reconnectionDelay: 3000, // Wait 3s between attempts
  });
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server with ID:", socket.id);
      socket.emit("process_request", _id);
    });

    socket.on("process_response", (response) => {
      console.log("Response from server:", response);
      setCurrentSlots(response);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    socket.on("disconnect", () => {
      console.warn("Disconnected from server. Will attempt reconnect...");
    });

    return () => {
      socket.off("connect");
      socket.off("process_response");
      socket.off("connect_error");
      socket.off("disconnect");
    };
  }, []);

  function bookedSlots0() {
    return currentSlots.filter(slot => slot.status === 'booked');
  }


  
     

 
  const fetchSlots = async () => {
    try {
      const slotsData = await getSlotsbySessionId('67d8f3b6df847e7d9cbc2626');
      console.log("Slots data fetched:", slotsData);
      const slotsCount = slotsData.length;
      console.log("Slots count:", slotsCount); 
      setCurrentSlots(slotsData);
      
    } catch (error) {
      console.error('Error fetching slots:', error);
    } finally {
    
    }
  };

  useEffect(() => {
    setBookedSlots(bookedSlots0());
    console.log("Booked Slots:", bookedSlots0());
    console.log("Booked Slots Length:", bookedSlots.length);
  }, [currentSlots]);

  

  
  const [currentSlotsCount, setCurrentSlotsCount] = useState([]);

  // Handle new record creation
  const handleCreateRecord = async (recordData) => {
    try {
      setLoading(true);
      setMessage('');

      // Add doctor ID to the form data
      const formData = {
        ...recordData,
        doctorId: doctorId,
        date: new Date().toISOString().split('T')[0] // Today's date if not provided
      };

      const data = await createRecord(formData);
      console.log('Record created:', data);
      setMessage('Record created successfully!');

      // Refresh patient records if a patient is selected
      if (selectedPatient?.id) {
        fetchPatientRecords(selectedPatient.id);
      }

      return data;
    } catch (error) {
      setMessage(error.message || 'Failed to create record');
      console.error('Error creating record:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch patient records
  // const fetchPatientRecords = async (patientId, page = 1) => {
  //   if (!patientId) return;
    
  //   try {
  //     setLoading(true);
  //     const data = await getRecordsByPatient(patientId, page, limit);
      
  //     // Update the records for this specific patient
  //     setPatientRecords(prevState => ({
  //       ...prevState,
  //       [patientId]: data.records
  //     }));
      
  //     // Update pagination info
  //     setCurrentPage(data.pagination.currentPage);
  //     setTotalPages(data.pagination.totalPages);
      
  //   } catch (error) {
  //     console.error('Error fetching patient records:', error);
  //     setMessage('Failed to fetch patient records');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Function to fetch records by patient and doctor
  // const fetchPatientDoctorRecords = async (patientId) => {
  //   if (!patientId || !doctorId) return;
    
  //   try {
  //     setLoading(true);
  //     const records = await getRecordsByPatientAndDoctor(patientId, doctorId, 1, limit);
      
  //     // Store these records specifically for this patient
  //     setPatientRecords(prevState => ({
  //       ...prevState,
  //       [patientId]: records
  //     }));
      
  //   } catch (error) {
  //     console.error('Error fetching patient-doctor records:', error);
  //     setMessage('Failed to fetch records');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // Set doctor ID from user info when available
  // useEffect(() => {
  //   if (user?.id) {
  //     setDoctorId(user.id);
  //   }
  // }, [user]);

  // // Handle pagination
  // const handlePageChange = (newPage) => {
  //   if (selectedPatient?.id && newPage > 0 && newPage <= totalPages) {
  //     setCurrentPage(newPage);
  //     fetchPatientRecords(selectedPatient.id, newPage);
  //   }
  // };

  // // Handle patient selection from PatientCardType1
  // const handlePatientSelect = (patient) => {
  //   setSelectedPatient(patient);
  //   if (patient?.id) {
  //     fetchPatientRecords(patient.id, 1);
  //   }
  // };

  // // Handle patient selection from PatientCardType2 (session patients)
  // const handleSessionPatientSelect = (patient) => {
  //   setSelectedPatient(patient);
  //   if (patient?.id) {
  //     fetchPatientDoctorRecords(patient.id);
  //   }
  // };

  return (
    <div className='flex flex-col h-[100%] gap-5 bg-[#FAFAF9] w-full px-2 py-2 items-start justify-start text-black animate-[pop_0.3s_ease-out]'>
      <DashboardNavigation />
      {!(selectedSession && selectedSession._id) ?(
        <div className="flex flex-row gap-2">
          <MedicinesPage setSession={setSelectedSession}/>
        </div>

      ) : (

      <div className="grid grid-flow-col  justify-center align-middle  gap-4 w-full ">
          <div className=" flex flex-col gap-2 space-y-4 w-[50vh]">
            
            {/* Small Section 1 */}
            <div className=" pr-2 pl-2 h-30">
              <SessionInfo SessionId={_id.slice(-6)} totalSlots={currentSlots.length} bookedSlots={bookedSlots.length}/>
            </div>

            {/* Small Section 2 */}
            <div className="h-80 flex rounded-[20px] bg-white shadow-md flex-col gap-3 pr-2">
              <div className="font-[500] text-[1.5rem] pl-5 text-gray-800">
                Waiting List
              </div>
              <PatientCardType1/>
            </div>

            {/* Small Section 3 */}
            <div className="h-100 rounded-[20px] bg-white shadow-md pr-2">
              <div className="font-[500] text-[1.5rem] pl-5 text-gray-800">
                Session’s Patient List
              </div>
              <PatientCardType2 bookedSlots={bookedSlots}/>
            </div>

          </div>

          {/* Large Section */}
          <div className="">
            <PatientDetailsCardType1 />
          </div>

      </div>)}

    </div> 
   
  );
}

export default App;

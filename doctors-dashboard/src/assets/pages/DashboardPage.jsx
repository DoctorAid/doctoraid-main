import React, { useState, useEffect } from 'react';
import { SignOutButton } from '@clerk/clerk-react';
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Plus, ChevronLeft, ChevronRight, LogOut, Calendar } from "lucide-react";
import PatientListComponent from '../components/PatientListComponent';
import SessionInfo from '../components/SessionInfo';
import { io } from "socket.io-client";
import SessionList from '../components/SessionList';

// Import API functions
import {
  createRecord,
  getRecordsByPatientAndDoctor,
  getPatientDetails,
  getSessionWaitingList,
  getSessionPatientList,
  getSlotsbySessionId
} from '../api/dashboardAPI';

function DashboardPage() {
  // State variables
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentPatientIndex, setCurrentPatientIndex] = useState(0);
  const [doctorId, setDoctorId] = useState("67d8aff139afa54b845fc507");  
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const [formData, setFormData] = useState({
    observation: "",
    prescription: "",
    notes: "", // Changed from "note" to "notes" to match API expectation
  });

  // API data states
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [currentSlots, setCurrentSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [waitingList, setWaitingList] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [patientDetails, setPatientDetails] = useState(null);
  const [patientRecords, setPatientRecords] = useState([]);

  // Get user from Clerk
  const { user } = useUser();
  const clerkId = user ? user.id : null;
  console.log("clerkId is:", clerkId);

  // Use the known active session ID
  
  const [activeSessionId, setActiveSessionId] = useState(null);
 // const [selectedSession, setSelectedSession] = useState({_id: activeSessionId});

  // Socket connection
  const socket = io("http://localhost:8080", {
    transports: ["websocket"],
    reconnectionAttempts: 5, 
    reconnectionDelay: 3000,
  });

  // Socket connection setup
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server with ID:", socket.id);
      socket.emit("process_request", activeSessionId);
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

    // Clean up socket connection on component unmount
    return () => {
      socket.off("connect");
      socket.off("process_response");
      socket.off("connect_error");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, []);

  // Filter booked slots
  function getBookedSlots() {
    return currentSlots.filter(slot => slot.status === 'booked');
  }

  // Update booked slots when currentSlots changes
  useEffect(() => {
    const bookedSlotsList = getBookedSlots();
    setBookedSlots(bookedSlotsList);
    console.log("Booked Slots:", bookedSlotsList);
    console.log("Booked Slots Length:", bookedSlotsList.length);
  }, [currentSlots]);

  // Fetch slots for the current session
  const fetchSlots = async () => {
    try {
      setLoading(true);
      console.log("Fetching slots for session:", activeSessionId);
      const slotsData = await getSlotsbySessionId(activeSessionId);
      console.log("Slots data fetched:", slotsData);
      setCurrentSlots(slotsData);
    } catch (error) {
      console.error('Error fetching slots:', error);
      setCurrentSlots([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch waiting list for the current session
  const fetchWaitingList = async () => {
    try {
      setLoading(true);
      console.log("Fetching waiting list for session:", activeSessionId);
      const waitingListData = await getSessionWaitingList(activeSessionId);
      console.log("Waiting list fetched:", waitingListData);
      
      // Extract the patients array from the nested response
      const patients = waitingListData && waitingListData.data && waitingListData.data.patients 
        ? waitingListData.data.patients 
        : [];
        
      setWaitingList(patients);
      
      // Select first patient if available
      if (patients.length > 0) {
        setCurrentPatientIndex(0);
      }
    } catch (error) {
      console.error('Error fetching waiting list:', error);
      setWaitingList([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch patient list for the current session
  const fetchPatientList = async () => {
    try {
      
      setLoading(true);
      console.log("Fetching patient list for session:", activeSessionId);
      const patientListData = await getSessionPatientList(activeSessionId);
      console.log("Patient list fetched:", patientListData);
      
      // Extract the patients array from the nested response
      const patients = patientListData && patientListData.data && patientListData.data.patients 
        ? patientListData.data.patients 
        : [];
        
      setPatientList(patients);
    } catch (error) {
      console.error('Error fetching patient list:', error);
      setPatientList([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch patient details
  const fetchPatientDetails = async (patientId) => {
    if (!patientId) return;
    
    try {
      setLoading(true);
      const details = await getPatientDetails(patientId);
      console.log("Patient details fetched:", details);
      
      // Check if response has a data property
      const patientDetails = details && details.data ? details.data : details;
      setPatientDetails(patientDetails);
    } catch (error) {
      console.error('Error fetching patient details:', error);
      setPatientDetails(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch patient records
  const fetchPatientRecords = async (patientId) => {
    if (!patientId) return;
    
    try {
      setLoading(true);
      const records = await getRecordsByPatientAndDoctor(patientId, doctorId);
      console.log("Patient records fetched:", records);
      
      // Check if response has a data property
      const patientRecords = records && records.data ? records.data : records;
      setPatientRecords(patientRecords || []);
      
      // Reset history index
      setCurrentHistoryIndex(0);
    } catch (error) {
      console.error('Error fetching patient records:', error);
      setPatientRecords([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial data loading
  useEffect(() => {
    // Load data when component mounts using the active session ID
    fetchSlots();
    fetchWaitingList();
    fetchPatientList();
  }, []);  // Empty dependency array means this runs once on mount

  // Fetch patient details and records when current patient changes
  useEffect(() => {
    if (waitingList.length > 0 && currentPatientIndex >= 0 && currentPatientIndex < waitingList.length) {
      const currentPatient = waitingList[currentPatientIndex];
      if (currentPatient && currentPatient._id) {
        fetchPatientDetails(currentPatient._id);
        fetchPatientRecords(currentPatient._id);
      }
    }
  }, [waitingList, currentPatientIndex]);

  // Handle record creation - UPDATED to match API requirements
  const handleCreateRecord = async () => {
    if (!currentPatient || !currentPatient._id) {
      setMessage('No patient selected or invalid patient ID');
      return;
    }
    
    try {
      setLoading(true);
      setMessage('');

      // Get the slot ID if available (either from the patient object or from the current slot)
      let slotId = null;
      if (currentPatient.slotId) {
        slotId = currentPatient.slotId;
      } else if (bookedSlots.length > 0) {
        // Try to find a matching slot for the current patient
        const matchingSlot = bookedSlots.find(slot => 
          slot.patientId === currentPatient._id
        );
        if (matchingSlot) {
          slotId = matchingSlot._id;
        }
      }

      // Prepare the record data to match the backend API requirements
      const recordData = {
        patientId: currentPatient._id,
        prescription: formData.prescription,
        observation: formData.observation,
        notes: formData.notes, // Previously was "note"
        date: new Date().toISOString().split('T')[0],
        slotId: slotId
      };

      console.log('Sending record data:', recordData);

      // Use the API function to create the record
      const data = await createRecord(doctorId, recordData);
      console.log('Record created:', data);
      setMessage('Record created successfully!');

      // Clear the form
      setFormData({ observation: "", prescription: "", notes: "" }); // Updated from "note" to "notes"
      
      // Refresh patient records
      if (currentPatient._id) {
        fetchPatientRecords(currentPatient._id);
      }
      
      // Move to next patient after saving
      handleNextPatient();

      return data;
    } catch (error) {
      setMessage(error.message || 'Failed to create record');
      console.error('Error creating record:', error);
    } finally {
      setLoading(false);
    }
  };

  // End Session function
  const handleEndSession = () => {
    // Show confirmation dialog
    if (window.confirm("Are you sure you want to end this session? This action cannot be undone.")) {
      // Add API call to end session here once implemented
      console.log("Ending session:", activeSessionId);
      setMessage("Session ended successfully!");
      // You could redirect or update UI as needed after session end
    }
  };

  // Mock patient data to use as fallback
  const mockPatientsData = [
    {
      name: "Denzel White", 
      date: "2024-02-01", 
      time: "09:00 AM",
      _id: "200 - 01",
      age: 28,
      sex: "Male",
      bloodType: "O+",
      allergies: ["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet"],
      addedComplaints: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis.",
      history: [
        {
          lastChecked: "21 April 2021",
          prescriptionId: "2J983KT0",
          observation: "High fever and cough at normal hemoglobin levels.",
          prescriptions: [
            "Paracetamol - 2 times a day",
            "Dizopam - Day and Night before meal",
            "Wikoryl",
          ],
          note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
          lastChecked: "05 May 2021",
          prescriptionId: "3H75GKL2",
          observation: "Mild headache and dizziness.",
          prescriptions: ["Ibuprofen - Morning and Evening", "Vitamin D supplement"],
          note: "Continue hydration and rest. Avoid caffeine.",
        },
      ]
    },
    {
      name: "Stacy Mitchell", 
      date: "2024-02-01", 
      time: "09:15 AM",
      _id: "220 - 02",
      age: 34,
      sex: "Female",
      bloodType: "A+",
      allergies: ["Penicillin", "Dairy products"],
      addedComplaints: "Persistent cough and mild fever for the past three days. Reports difficulty sleeping due to cough.",
      history: [
        {
          lastChecked: "15 March 2021",
          prescriptionId: "4K751LP3",
          observation: "Seasonal allergies with congestion.",
          prescriptions: [
            "Cetirizine - Once daily",
            "Nasal spray - Morning and evening",
          ],
          note: "Follow up in two weeks if symptoms persist.",
        }
      ]
    }
  ];

  // Use API data or fallbacks
  const patientsData = waitingList.length > 0 ? waitingList : mockPatientsData;
  const currentPatient = patientDetails || (patientsData.length > 0 ? patientsData[currentPatientIndex] : null);

  // Navigation functions for patient history
  const nextHistory = () => {
    const historyLength = patientRecords.length || (currentPatient?.history?.length || 0);
    if (currentHistoryIndex < historyLength - 1) {
      setCurrentHistoryIndex(currentHistoryIndex + 1);
    }
  };

  const prevHistory = () => {
    if (currentHistoryIndex > 0) {
      setCurrentHistoryIndex(currentHistoryIndex - 1);
    }
  };

  // Navigation function for patients
  const handleNextPatient = () => {
    if (currentPatientIndex < patientsData.length - 1) {
      setCurrentPatientIndex(currentPatientIndex + 1);
      // Reset form and history index for the new patient
      setFormData({ observation: "", prescription: "", notes: "" }); // Updated from "note" to "notes"
      setCurrentHistoryIndex(0);
    } else {
      // If we're at the last patient, show a message
      console.log("End of patient list reached");
      setMessage("End of patient list reached");
    }
  };

  // Get current history item
  const currentHistory = patientRecords.length > 0 
    ? patientRecords[currentHistoryIndex] 
    : currentPatient?.history 
      ? currentPatient.history[currentHistoryIndex]
      : null;

  // Show loading screen during initial data load
  if (loading && !patientsData.length) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FAFAF9] font-['Raleway',sans-serif]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#295567]"></div>
      </div>
    );
  }

  if(activeSessionId == null) {
    return (
      <SessionList setSession={setActiveSessionId} />)
  };

  // Get today's date in formatted string
  const today = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  return (
    <div className='flex flex-col h-screen gap-4 bg-[#FAFAF9] w-full px-4 py-4 items-start justify-start text-gray-800 animate-pageTransition font-["Raleway",sans-serif] overflow-hidden'>
      {/* Custom Navigation Bar */}
      <div className='flex justify-between w-full items-center px-6 py-3 bg-white border-b border-gray-100 shadow-sm rounded-xl'>
        {/* Left: Doctor greeting and date */}
        <div className='flex items-center gap-3'>
          <div className="flex items-center justify-center w-10 h-10 bg-[#295567]/10 rounded-lg">
            <Calendar size={20} className="text-[#295567]" />
          </div>
          <div className='flex flex-col'>
            <p className="text-gray-900 font-semibold">
              Welcome back, <span className="text-[#295567]">Dr. Bessie</span>
            </p>
            <p className="text-gray-500 text-sm">
              {formattedDate}
            </p>
          </div>
        </div>
        
        {/* Right: Actions */}
        <div className='flex items-center gap-3'>
          {/* End Session button */}
          <button 
            onClick={handleEndSession}
            className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium py-1.5 px-3 rounded-lg transition-all duration-200 border border-red-200"
          >
            <LogOut size={16} />
            End Session
          </button>
          
          {/* User profile button */}
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      
      <div className="grid grid-flow-col grid-cols-[300px_minmax(0,1fr)] justify-center align-middle gap-4 w-full overflow-hidden h-[calc(100vh-90px)]">
        <div className="flex flex-col gap-3 w-full h-full overflow-hidden">
          
          {/* Session Info Component */}
          <div className="w-full">
            <SessionInfo 
              SessionId={activeSessionId.slice(-6)} 
              totalSlots={currentSlots.length} 
              bookedSlots={bookedSlots.length}
            />
          </div>

          {/* Waiting List - Highlighting the current patient */}
          <div className="flex rounded-xl bg-white shadow-sm border border-gray-100 flex-col h-1/2 overflow-hidden">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
              <div className="font-medium text-base text-gray-800">
                Waiting List
              </div>
    
            </div>
            <div className="overflow-y-auto w-full p-3 space-y-2 flex-grow">
              {patientsData.map((patient, index) => {
                // Extract first letter of name for avatar
                const initial = patient.name && typeof patient.name === 'string' ? 
                  patient.name.charAt(0).toUpperCase() : '?';
                  
                return (
                  <div 
                    key={patient._id || index} 
                    className={`flex items-center ${
                      index === currentPatientIndex 
                        ? 'bg-[#295567]/10 border border-[#295567]/30' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    } rounded-lg p-2 w-full cursor-pointer transition-colors duration-200`}
                    onClick={() => setCurrentPatientIndex(index)}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 ${
                      index === currentPatientIndex 
                        ? 'bg-[#295567] text-white' 
                        : 'bg-gray-50 text-[#295567]'
                    } rounded-full text-sm font-medium transition-colors duration-200`}>
                      {initial}
                    </div>
                    <div className="ml-2 overflow-hidden">
                      <h3 className="text-gray-800 font-medium text-sm truncate">
                        {patient.name || 'Unknown'}
                      </h3>
                      <p className="text-gray-500 text-xs">
                        {patient.appointmentTime || 'No time'}
                      </p>
                    </div>
                  </div>
                );
              })}
              {patientsData.length === 0 && (
                <div className="text-center text-gray-500 py-4 text-sm">
                  No patients in waiting list
                </div>
              )}
            </div>
          </div>

          {/* Patient List Component */}
          <div className="h-1/2 overflow-hidden">
            <PatientListComponent patients={patientList} />
          </div>
        </div>

        {/* Patient Details - Showing the current patient */}
        <div className="w-full h-full overflow-hidden">
          <div className="p-4 bg-white flex flex-col rounded-xl shadow-sm border border-gray-100 h-full overflow-y-auto">
            {currentPatient ? (
              <>
                {/* Top Section - Compact header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold text-gray-800">Patient Details</h2>
                  <div className="text-xs font-medium px-2 py-1 bg-[#295567]/10 text-[#295567] rounded-full">
                    On-going
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Left: Patient Details */}
                  <div className="w-full pr-4">
                    <div className="flex items-center">
                      {/* Patient Avatar */}
                      <div className="h-12 w-12 flex items-center justify-center bg-[#295567]/10 text-[#295567] text-base font-bold rounded-full border border-[#295567]/20">
                        {currentPatient && currentPatient.name
                          ? currentPatient.name.charAt(0).toUpperCase()
                          : '?'}
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-bold">
                          {currentPatient?.name || 'Unknown'}
                        </p>
                        <p className="text-gray-500 text-xs">ID: {currentPatient?._id?.slice(-6) || '?'}</p>
                      </div>
                    </div>

                    <div className="mt-4 text-gray-700 space-y-1 text-sm">
                      <div className="grid grid-cols-2 gap-1">
                        <p><span className="font-medium text-gray-600">Sex:</span> {currentPatient?.gender || 'N/A'}</p>
                        <p><span className="font-medium text-gray-600">Age:</span> {currentPatient?.age || 'N/A'}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <p><span className="font-medium text-gray-600">Blood:</span> {currentPatient?.bloodGroup || 'N/A'}</p>
                        <p><span className="font-medium text-gray-600">Contact:</span> {currentPatient?.contactNumber || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-600">Allergies:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {currentPatient?.allergies && currentPatient.allergies.length > 0 ? (
                            currentPatient.allergies.map((allergy, index) => (
                              <span key={index} className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-100">
                                {allergy}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">
                              No allergies
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <h3 className="font-medium text-gray-800 mb-1 text-sm">Complaints</h3>
                      <p className="text-gray-600 text-xs bg-[#FAFAF9] p-2 rounded-lg max-h-20 overflow-y-auto">
                        {currentPatient?.patientNote || 'No complaints recorded'}
                      </p>
                    </div>
                  </div>

                  {/* Right: Consultation History */}
                  <div className="w-full pl-4 border-l border-gray-100">
                    <h2 className="text-sm font-bold text-gray-800 mb-2">Consultation History</h2>
                    {(patientRecords.length > 0 || (currentPatient.history && currentPatient.history.length > 0)) ? (
                      <div className="text-gray-700 bg-[#FAFAF9] p-3 rounded-lg border border-gray-100 max-h-40 overflow-y-auto">
                        {currentHistory && (
                          <>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-medium text-gray-600">
                                {currentHistory.lastChecked || currentHistory.date || 'Not recorded'}
                              </span>
                              <span className="text-xs bg-[#295567]/10 text-[#295567] px-1.5 py-0.5 rounded-full">
                                {currentHistory.prescriptionId || currentHistory._id?.slice(-6) || 'N/A'}
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <p className="text-xs text-gray-500 mb-0.5">Observation</p>
                                <p className="text-xs">{currentHistory.observation || 'None'}</p>
                              </div>
                              
                              <div>
                                <p className="text-xs text-gray-500 mb-0.5">Prescription</p>
                                {currentHistory.prescriptions ? 
                                  <ul className="space-y-0.5">
                                    {currentHistory.prescriptions.map((prescription, index) => (
                                      <li key={index} className="text-xs pl-1.5 border-l-2 border-[#295567]/30">{prescription}</li>
                                    ))}
                                  </ul>
                                  : currentHistory.prescription ? (
                                    <p className="text-xs pl-1.5 border-l-2 border-[#295567]/30">{currentHistory.prescription}</p>
                                  ) : (
                                    <p className="text-xs text-gray-500 italic">No prescriptions</p>
                                  )
                                }
                              </div>
                              
                              <div>
                                <p className="text-xs text-gray-500 mb-0.5">Note</p>
                                <p className="text-xs">{currentHistory.note || currentHistory.notes || 'None'}</p>
                              </div>
                            </div>
                          </>
                        )}
                        
                        {/* Navigation buttons */}
                        {(patientRecords.length > 1 || (currentPatient.history && currentPatient.history.length > 1)) && (
                          <div className="flex justify-center space-x-3 mt-2">
                            <button 
                              className={`flex items-center justify-center w-6 h-6 rounded-full ${
                                currentHistoryIndex === 0 
                                  ? "text-gray-300 cursor-not-allowed" 
                                  : "text-[#295567] hover:bg-[#295567]/10"
                              } transition-all duration-200`} 
                              onClick={prevHistory}
                              disabled={currentHistoryIndex === 0}
                            >
                              <ChevronLeft size={14} />
                            </button>
                            <button 
                              className={`flex items-center justify-center w-6 h-6 rounded-full ${
                                currentHistoryIndex === (patientRecords.length > 0 
                                  ? patientRecords.length - 1 
                                  : (currentPatient.history ? currentPatient.history.length - 1 : 0)) 
                                  ? "text-gray-300 cursor-not-allowed" 
                                  : "text-[#295567] hover:bg-[#295567]/10"
                              } transition-all duration-200`} 
                              onClick={nextHistory}
                              disabled={currentHistoryIndex === (patientRecords.length > 0 
                                ? patientRecords.length - 1 
                                : (currentPatient.history ? currentPatient.history.length - 1 : 0))}
                            >
                              <ChevronRight size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="mt-2 text-gray-500 italic bg-[#FAFAF9] p-3 rounded-lg border border-gray-100 text-xs">
                        No previous consultations found
                      </div>
                    )}
                  </div>
                </div>

                {/* Ongoing Treatment Inputs */}
                <div className="mt-6 pt-3 border-t border-gray-100">
                  <h2 className="text-base font-bold text-gray-800 mb-3">Current Consultation</h2>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-gray-600 text-xs font-medium mb-1">Observation:</label>
                      <input
                        type="text"
                        className="w-full border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-[#295567]/30 focus:outline-none transition-all duration-200 text-sm"
                        value={formData.observation}
                        onChange={(e) => setFormData({ ...formData, observation: e.target.value })}
                        placeholder="Enter your observation"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-600 text-xs font-medium mb-1">Prescription:</label>
                        <textarea
                  className="w-full border border-gray-200 rounded-lg p-2 h-20 focus:ring-2 focus:ring-[#295567]/30 focus:outline-none transition-all duration-200 text-sm"
                          value={formData.prescription}
                          onChange={(e) => setFormData({ ...formData, prescription: e.target.value })}
                          placeholder="Enter prescription details"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-xs font-medium mb-1">Note:</label>
                        <textarea
                          className="w-full border border-gray-200 rounded-lg p-2 h-20 focus:ring-2 focus:ring-[#295567]/30 focus:outline-none transition-all duration-200 text-sm"
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          placeholder="Add additional notes here"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save & Next Buttons */}
                <div className="flex justify-end mt-4 space-x-3">
                  {message && (
                    <div className="text-green-600 self-center mr-auto text-xs bg-green-50 px-2 py-1 rounded-full">
                      {message}
                    </div>
                  )}
                  <button 
                    className="bg-[#FAFAF9] hover:bg-[#295567]/10 text-[#295567] font-medium py-1.5 px-3 rounded-lg transition-all duration-200 border border-[#295567]/30 text-sm"
                    onClick={handleCreateRecord}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button 
                    className="bg-[#295567] hover:bg-[#295567]/90 text-white font-medium py-1.5 px-3 rounded-lg transition-all duration-200 shadow-sm text-sm"
                    onClick={handleNextPatient}
                    disabled={currentPatientIndex >= patientsData.length - 1}
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="bg-[#295567]/10 rounded-full p-4 mb-3">
                  <ChevronLeft size={24} className="text-[#295567]" />
                </div>
                <p className="text-base text-gray-500">Select a patient to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
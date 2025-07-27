import React, { useState, useEffect,useRef } from 'react';
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
  
  const [activeSessionId, setActiveSessionId] = useState(() => {
    return localStorage.getItem("activeSessionId") || null;
});

useEffect(() => {
    if (activeSessionId) {
        localStorage.setItem("activeSessionId", activeSessionId);
    } else {
        localStorage.removeItem("activeSessionId");
    }
}, [activeSessionId]);
 // const [selectedSession, setSelectedSession] = useState({_id: activeSessionId});

  // Socket connection setup
   const socketRef = useRef(null);
    
    console.log("Socket connection reference:", socketRef.current);

    useEffect(() => {
        console.log("Setting up socket connection...");
        
        if (!socketRef.current) {
            // More permissive connection options for debugging
            socketRef.current = io("http://localhost:8080", {
                // Allow both polling and websocket (remove transports restriction)
                // transports: ["websocket"], // Comment this out temporarily
                reconnectionAttempts: 5,
                reconnectionDelay: 3000,
                timeout: 20000,
                forceNew: true,
                // Add additional debugging options
                autoConnect: true,
            });

            socketRef.current.on("connect", () => {
                console.log("✅ Connected with ID:", socketRef.current.id);
                console.log("Transport:", socketRef.current.io.engine.transport.name);
                
                // Watch the active session for slot updates
                if (activeSessionId) {
                    console.log("👁️ Starting to watch session:", activeSessionId);
                    socketRef.current.emit("watch_session", activeSessionId);
                }
            });

            socketRef.current.on("connect_error", (err) => {
                console.error("❌ Socket connection error:", err);
                console.error("Error details:", {
                    message: err.message,
                    description: err.description,
                    context: err.context,
                    type: err.type
                });
            });

            socketRef.current.on("disconnect", (reason) => {
                console.warn("⚠️ Disconnected from server. Reason:", reason);
            });

            // Listen for slot updates from the server
            socketRef.current.on("slot_update", (data) => {
                console.log("📥 Received slot update from server:", data);
                
                // Check if this update is for the current active session
                if (data.sessionId === activeSessionId) {
                    console.log("🔄 Updating slots for current session");
                    
                    // Update the current slots state with the new data
                    if (data.slots && Array.isArray(data.slots)) {
                        setCurrentSlots(data.slots);
                        console.log(`✅ Updated ${data.slots.length} slots for session ${activeSessionId}`);
                        
                        // Show a brief message about the update
                        if (data.changeType === 'delete') {
                            setMessage('Slot deleted - data updated');
                            setTimeout(() => setMessage(''), 3000);
                        }
                    }
                    
                    // Optionally refresh waiting list and patient list as well
                    // since slot changes might affect these lists
                    if (data.changeType === 'delete' || data.changeType === 'insert') {
                        console.log("🔄 Refreshing related data due to slot change");
                        fetchWaitingList();
                        fetchPatientList();
                    }
                }
            });

            // Listen for watch errors
            socketRef.current.on("watch_error", (error) => {
                console.error("📥 Received watch error from server:", error);
                setMessage(`Error watching session: ${error.error}`);
            });

            // Listen for slot data responses
            socketRef.current.on("slots_data", (data) => {
                console.log("📥 Received slots data:", data);
                if (data.sessionId === activeSessionId && data.slots) {
                    setCurrentSlots(data.slots);
                }
            });

            // Listen for slots errors
            socketRef.current.on("slots_error", (error) => {
                console.error("📥 Received slots error:", error);
            });

            // Additional debugging events
            socketRef.current.on("reconnect", (attemptNumber) => {
                console.log("🔄 Reconnected after", attemptNumber, "attempts");
                // Re-watch the session after reconnection
                if (activeSessionId) {
                    socketRef.current.emit("watch_session", activeSessionId);
                }
            });

            socketRef.current.on("reconnect_attempt", (attemptNumber) => {
                console.log("🔄 Reconnection attempt", attemptNumber);
            });

            socketRef.current.on("reconnect_error", (error) => {
                console.error("🔄 Reconnection error:", error);
            });

            socketRef.current.on("reconnect_failed", () => {
                console.error("🔄 Failed to reconnect");
            });
        }

        return () => {
            if (socketRef.current) {
                console.log("🧹 Cleaning up socket connection...");
                // Unwatch the session before disconnecting
                if (activeSessionId) {
                    socketRef.current.emit("unwatch_session", activeSessionId);
                }
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, []);

    // Watch for activeSessionId changes and update socket subscription
    useEffect(() => {
        if (socketRef.current && socketRef.current.connected) {
            if (activeSessionId) {
                console.log("👁️ Starting to watch new session:", activeSessionId);
                socketRef.current.emit("watch_session", activeSessionId);
            }
        }
    }, [activeSessionId]);

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
    if (activeSessionId) {
      fetchSlots();
      fetchWaitingList();
      fetchPatientList();
    }
  }, [activeSessionId]);

  // Fetch patient details and records when current patient changes
  useEffect(() => {
    if (waitingList.length > 0 && currentPatientIndex >= 0 && currentPatientIndex < waitingList.length) {
      const currentPatient = waitingList[currentPatientIndex];
      if (currentPatient && currentPatient._id) {
        fetchPatientDetails(currentPatient._id);
        fetchPatientRecords(currentPatient._id);
      }
    }
  }, [waitingList, currentPatientIndex, activeSessionId]);

  // Handle record creation
  const handleCreateRecord = async () => {
    if (!waitingList[currentPatientIndex] || !waitingList[currentPatientIndex]._id) {
      setMessage('No patient selected or invalid patient ID');
      return;
    }
    
    try {
      setLoading(true);
      setMessage('');

      const currentPatient = waitingList[currentPatientIndex];
      
      // Get the slot ID if available
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
        notes: formData.notes,
        date: new Date().toISOString().split('T')[0],
        slotId: slotId
      };

      console.log('Sending record data:', recordData);

      // Use the API function to create the record
      const data = await createRecord(doctorId, recordData);
      console.log('Record created:', data);
      setMessage('Record created successfully!');

      // Clear the form
      setFormData({ observation: "", prescription: "", notes: "" });
      
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

  // Navigation functions for patient history
  const nextHistory = () => {
    const historyLength = patientRecords.length;
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
    if (currentPatientIndex < waitingList.length - 1) {
      setCurrentPatientIndex(currentPatientIndex + 1);
      // Reset form and history index for the new patient
      setFormData({ observation: "", prescription: "", notes: "" });
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
    : null;

  // Show loading screen during initial data load
  if (loading && !waitingList.length) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#FAFAF9] font-['Raleway',sans-serif]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#295567]"></div>
      </div>
    );
  }

  if(activeSessionId == null) {
    return (
      <SessionList setSession={setActiveSessionId} />
    );
  }

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
              Welcome back, <span className="text-[#295567]">Dr. {user?.firstName || 'Doctor'}</span>
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
            onClick={() => {
              setActiveSessionId(null);
              console.log("Session ID set to null");
          }} 
            className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium py-1.5 px-3 rounded-lg transition-all duration-200 border border-red-200"
          >
            <LogOut 
              size={16} 
             
          />
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
              {waitingList.map((patient, index) => {
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
              {waitingList.length === 0 && (
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
            {waitingList.length > 0 && waitingList[currentPatientIndex] ? (
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
                        {patientDetails && patientDetails.name
                          ? patientDetails.name.charAt(0).toUpperCase()
                          : '?'}
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-bold">
                          {patientDetails?.name || 'Unknown'}
                        </p>
                        <p className="text-gray-500 text-xs">ID: {patientDetails?._id?.slice(-6) || '?'}</p>
                      </div>
                    </div>

                    <div className="mt-4 text-gray-700 space-y-1 text-sm">
                      <div className="grid grid-cols-2 gap-1">
                        <p><span className="font-medium text-gray-600">Sex:</span> {patientDetails?.gender || 'N/A'}</p>
                        <p><span className="font-medium text-gray-600">Age:</span> {patientDetails?.age || 'N/A'}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <p><span className="font-medium text-gray-600">Blood:</span> {patientDetails?.bloodGroup || 'N/A'}</p>
                        <p><span className="font-medium text-gray-600">Contact:</span> {patientDetails?.contactNumber || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-600">Allergies:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {patientDetails?.allergies && patientDetails.allergies.length > 0 ? (
                            patientDetails.allergies.map((allergy, index) => (
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
                        {patientDetails?.patientNote || 'No complaints recorded'}
                      </p>
                    </div>
                  </div>

                  {/* Right: Consultation History */}
                  <div className="w-full pl-4 border-l border-gray-100">
                    <h2 className="text-sm font-bold text-gray-800 mb-2">Consultation History</h2>
                    {patientRecords.length > 0 ? (
                      <div className="text-gray-700 bg-[#FAFAF9] p-3 rounded-lg border border-gray-100 max-h-40 overflow-y-auto">
                        {currentHistory && (
                          <>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs font-medium text-gray-600">
                                {currentHistory.date || 'Not recorded'}
                              </span>
                              <span className="text-xs bg-[#295567]/10 text-[#295567] px-1.5 py-0.5 rounded-full">
                                {currentHistory._id?.slice(-6) || 'N/A'}
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <p className="text-xs text-gray-500 mb-0.5">Observation</p>
                                <p className="text-xs">{currentHistory.observation || 'None'}</p>
                              </div>
                              
                              <div>
                                <p className="text-xs text-gray-500 mb-0.5">Prescription</p>
                                {currentHistory.prescription ? (
                                  <p className="text-xs pl-1.5 border-l-2 border-[#295567]/30">{currentHistory.prescription}</p>
                                ) : (
                                  <p className="text-xs text-gray-500 italic">No prescriptions</p>
                                )}
                              </div>
                              
                              <div>
                                <p className="text-xs text-gray-500 mb-0.5">Note</p>
                                <p className="text-xs">{currentHistory.notes || 'None'}</p>
                              </div>
                            </div>
                          </>
                        )}
                        
                        {/* Navigation buttons */}
                        {patientRecords.length > 1 && (
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
                                currentHistoryIndex === patientRecords.length - 1 
                                  ? "text-gray-300 cursor-not-allowed" 
                                  : "text-[#295567] hover:bg-[#295567]/10"
                              } transition-all duration-200`} 
                              onClick={nextHistory}
                              disabled={currentHistoryIndex === patientRecords.length - 1}
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
                    disabled={currentPatientIndex >= waitingList.length - 1}
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
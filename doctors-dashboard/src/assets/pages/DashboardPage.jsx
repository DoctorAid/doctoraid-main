import React, { useState, useEffect } from 'react';
import { SignOutButton } from '@clerk/clerk-react';
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import DashboardNavigation from '../page_sections/dashboard/DashboardNavigation';
import PatientListComponent from '../components/PatientListComponent';
import SessionInfo from '../components/SessionInfo';
import { io } from "socket.io-client";
import MedicinesPage from './MedicinesPage';

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
  const [doctorId, setDoctorId] = useState("12345"); // This would typically come from auth
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const [formData, setFormData] = useState({
    observation: "",
    prescription: "",
    note: "",
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
  const activeSessionId = "67de8e3da59adc9e14b1a348";
  const [selectedSession, setSelectedSession] = useState({_id: activeSessionId});

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
      if (currentPatient && currentPatient.patientId) {
        fetchPatientDetails(currentPatient.patientId);
        fetchPatientRecords(currentPatient.patientId);
      }
    }
  }, [waitingList, currentPatientIndex]);

  // Mock patient data to use as fallback
  const mockPatientsData = [
    {
      name: "Denzel White", 
      date: "2024-02-01", 
      time: "09:00 AM",
      patientId: "200 - 01",
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
      patientId: "220 - 02",
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

  // Handle record creation
  const handleCreateRecord = async () => {
    if (!currentPatient) return;
    
    try {
      setLoading(true);
      setMessage('');

      // Prepare the record data
      const recordData = {
        ...formData,
        doctorId: doctorId,
        date: new Date().toISOString().split('T')[0],
        patientId: currentPatient.patientId
      };

      // Use the API function to create the record
      const data = await createRecord(doctorId, recordData);
      console.log('Record created:', data);
      setMessage('Record created successfully!');

      // Clear the form
      setFormData({ observation: "", prescription: "", note: "" });
      
      // Move to next patient after saving
      handleNextPatient();

      // Refresh patient records
      if (currentPatient.patientId) {
        fetchPatientRecords(currentPatient.patientId);
      }

      return data;
    } catch (error) {
      setMessage(error.message || 'Failed to create record');
      console.error('Error creating record:', error);
    } finally {
      setLoading(false);
    }
  };

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
      setFormData({ observation: "", prescription: "", note: "" });
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
    return <div className="flex text-4xl w-full items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className='flex flex-col h-[100%] gap-5 bg-[#FAFAF9] w-full px-2 py-2 items-start justify-start text-black animate-[pop_0.3s_ease-out]'>
      <DashboardNavigation />
      
      <div className="grid grid-flow-col grid-cols-[350px_minmax(0,1fr)] justify-center align-middle gap-4 w-full">
        <div className="flex flex-col gap-2 space-y-4 w-full">
          
          {/* Session Info */}
          <div className="pr-2 pl-2 h-30">
            <SessionInfo 
              SessionId={activeSessionId.slice(-6)} 
              totalSlots={currentSlots.length} 
              bookedSlots={bookedSlots.length}
            />
          </div>

          {/* Waiting List - Highlighting the current patient */}
          <div className="flex rounded-[20px] bg-white shadow-md flex-col gap-3 pr-2">
            <div className="font-[500] text-[1.5rem] pl-5 pt-4 text-gray-800">
              Waiting List
            </div>
            <div className="max-h-[250px] overflow-y-auto w-full space-y-4 p-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
              {patientsData.map((patient, index) => (
                <div 
                  key={index} 
                  className={`flex items-center ${index === currentPatientIndex ? 'bg-blue-100 border-2 border-blue-300' : 'bg-blue-50'} rounded-lg p-4 w-full h-[80px] cursor-pointer`}
                  onClick={() => setCurrentPatientIndex(index)}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-200 rounded-full text-lg font-bold text-blue-600">
                    {patient.name ? patient.name.charAt(0) : (patient.firstName ? patient.firstName.charAt(0) : '?')}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-800 font-semibold text-lg">
                      {patient.name || (patient.firstName && patient.lastName ? `${patient.firstName} ${patient.lastName}` : 'Unknown')}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {patient.date} <span className="mx-2">|</span> {patient.time || patient.contactNumber}
                    </p>
                  </div>
                </div>
              ))}
              {patientsData.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  No patients in waiting list
                </div>
              )}
            </div>
          </div>

          {/* Session Patient List Component */}
          <PatientListComponent patients={patientList} />
        </div>

        {/* Patient Details - Showing the current patient */}
        <div className="w-full h-full">
          <div className="p-6 bg-white flex flex-col rounded-[40px] shadow-md h-full">
            {currentPatient ? (
              <>
                {/* Top Section */}
                <div className="flex justify-between flex-1">
                  {/* Left: Patient Details */}
                  <div className="w-1/2 pr-8">
                    <h2 className="text-2xl font-bold">On-going - Patient Details</h2>
                    <div className="flex items-center mt-4">
                      {/* Patient Avatar */}
                      <div className="h-16 w-16 flex items-center justify-center bg-blue-100 text-blue-600 text-xl font-bold rounded-full border border-blue-300">
                        {currentPatient.name
                          ? currentPatient.name.split(" ").map((part) => part[0]).join("").toUpperCase()
                          : (currentPatient.firstName
                              ? currentPatient.firstName.charAt(0).toUpperCase() + (currentPatient.lastName ? currentPatient.lastName.charAt(0).toUpperCase() : '')
                              : '?')}
                      </div>
                      <div className="ml-4">
                        <p className="text-lg font-bold">
                          {currentPatient.name || (currentPatient.firstName && currentPatient.lastName ? `${currentPatient.firstName} ${currentPatient.lastName}` : 'Unknown')}
                        </p>
                        <p className="text-gray-500">Patient ID - {currentPatient.patientId || currentPatient._id}</p>
                      </div>
                    </div>

                    <div className="mt-4 text-gray-700">
                      <p><strong>Sex:</strong> {currentPatient.sex || 'Not specified'}</p>
                      <p><strong>Age:</strong> {currentPatient.age || 'Not specified'}</p>
                      <p><strong>Blood:</strong> {currentPatient.bloodType || 'Not specified'}</p>
                      <p><strong>Contact:</strong> {currentPatient.contactNumber || 'Not specified'}</p>
                      <p><strong>Allergies:</strong></p>
                      <ul className="list-disc pl-5">
                        {currentPatient.allergies && currentPatient.allergies.length > 0 ? (
                          currentPatient.allergies.map((allergy, index) => (
                            <li key={index}>{allergy}</li>
                          ))
                        ) : (
                          <li>No known allergies</li>
                        )}
                      </ul>
                    </div>

                    <hr className="my-4" />

                    <h3 className="font-semibold">Added Complaints</h3>
                    <p className="text-gray-600">{currentPatient.addedComplaints || 'No complaints recorded'}</p>
                  </div>

                  {/* Right: Consultation History */}
                  <div className="w-1/2 pl-8">
                    <h2 className="text-2xl font-bold">Consultation History</h2>
                    {(patientRecords.length > 0 || (currentPatient.history && currentPatient.history.length > 0)) ? (
                      <div className="mt-4 text-gray-700">
                        {currentHistory && (
                          <>
                            <p>
                              <strong>Last Checked:</strong> {currentHistory.lastChecked || currentHistory.date || 'Not recorded'} 
                              <a href="#" className="text-blue-600 underline ml-2">
                                #{currentHistory.prescriptionId || currentHistory._id || 'N/A'}
                              </a>
                            </p>
                            <p><strong>Observation:</strong> {currentHistory.observation || 'None'}</p>
                            <p><strong>Prescription:</strong></p>
                            <ul className="list-disc pl-5">
                              {currentHistory.prescriptions 
                                ? currentHistory.prescriptions.map((prescription, index) => (
                                  <li key={index}>{prescription}</li>
                                ))
                                : currentHistory.prescription ? (
                                  <li>{currentHistory.prescription}</li>
                                ) : (
                                  <li>No prescriptions</li>
                                )
                              }
                            </ul>
                            <p><strong>Note:</strong> {currentHistory.note || 'None'}</p>
                          </>
                        )}
                        
                        {/* Navigation buttons */}
                        {(patientRecords.length > 1 || (currentPatient.history && currentPatient.history.length > 1)) && (
                          <div className="flex justify-center space-x-4 mt-4">
                            <button 
                              className={`text-gray-500 text-2xl ${currentHistoryIndex === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`} 
                              onClick={prevHistory}
                              disabled={currentHistoryIndex === 0}
                            >
                              &lt;
                            </button>
                            <button 
                              className={`text-gray-500 text-2xl ${
                                currentHistoryIndex === (patientRecords.length > 0 
                                  ? patientRecords.length - 1 
                                  : (currentPatient.history ? currentPatient.history.length - 1 : 0)) 
                                  ? "opacity-50 cursor-not-allowed" 
                                  : "cursor-pointer"
                              }`} 
                              onClick={nextHistory}
                              disabled={currentHistoryIndex === (patientRecords.length > 0 
                                ? patientRecords.length - 1 
                                : (currentPatient.history ? currentPatient.history.length - 1 : 0))}
                            >
                              &gt;
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="mt-4 text-gray-500 italic">No previous consultations found</div>
                    )}
                  </div>
                </div>

                {/* Ongoing Treatment Inputs */}
                <div className="mt-8">
                  <h2 className="text-2xl font-bold">On-going</h2>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-gray-700 font-semibold">Observation:</label>
                      <input
                        type="text"
                        className="w-full border border-blue-300 rounded-md p-2 mt-1"
                        value={formData.observation}
                        onChange={(e) => setFormData({ ...formData, observation: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-semibold">Prescription:</label>
                        <textarea
                          className="w-full border border-blue-300 rounded-md p-2 mt-1 h-24"
                          value={formData.prescription}
                          onChange={(e) => setFormData({ ...formData, prescription: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold">Note:</label>
                        <textarea
                          className="w-full border border-blue-300 rounded-md p-2 mt-1 h-24"
                          value={formData.note}
                          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save & Next Buttons */}
                <div className="flex justify-end mt-6 space-x-4">
                  {message && (
                    <div className="text-green-500 self-center mr-auto">{message}</div>
                  )}
                  <button 
                    className="bg-blue-100 hover:bg-blue-200 text-blue-600 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                    onClick={handleCreateRecord}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                    onClick={handleNextPatient}
                    disabled={currentPatientIndex >= patientsData.length - 1}
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-xl text-gray-500">Select a patient to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
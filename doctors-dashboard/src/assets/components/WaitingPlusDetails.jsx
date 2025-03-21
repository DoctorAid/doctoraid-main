import React, { useState } from 'react';

function WaitingPlusDetails({ doctorId = "12345" }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentPatientIndex, setCurrentPatientIndex] = useState(0);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const [formData, setFormData] = useState({
    observation: "",
    prescription: "",
    note: "",
  });

  // Session data
  const sessionData = [
    { sessionId: "2241206", left: 15, total: 20 },
  ];

  // Comprehensive patient data array that includes both waiting list info and patient details
  const patientsData = [
    {
      // Waiting list info
      name: "Denzel White", 
      date: "2024-02-01", 
      time: "09:00 AM",
      // Patient details
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
    },
    {
      name: "Amy Dunham", 
      date: "2024-02-01", 
      time: "09:30 AM",
      patientId: "254 - 02",
      age: 42,
      sex: "Female",
      bloodType: "B-",
      allergies: ["Sulfa drugs"],
      addedComplaints: "Joint pain in knees and lower back, worsening over the past month. Reports difficulty with stairs.",
      history: [
        {
          lastChecked: "10 January 2021",
          prescriptionId: "9P347QR8",
          observation: "Early signs of osteoarthritis in left knee.",
          prescriptions: [
            "Ibuprofen - As needed for pain",
            "Glucosamine supplement - Daily",
          ],
          note: "Recommended physical therapy evaluation.",
        }
      ]
    },
    {
      name: "Demi Joan", 
      date: "2024-02-01", 
      time: "09:50 AM",
      patientId: "260 - 01",
      age: 25,
      sex: "Female",
      bloodType: "O-",
      allergies: [],
      addedComplaints: "Frequent headaches and occasional dizziness. Reports increased screen time due to work.",
      history: [
        {
          lastChecked: "05 December 2020",
          prescriptionId: "7M294HT5",
          observation: "Tension headaches, normal neurological exam.",
          prescriptions: [
            "Acetaminophen - As needed",
            "Eye strain prevention exercises",
          ],
          note: "Recommended reducing screen time and using blue light filters.",
        }
      ]
    },
    {
      name: "Susan Myers", 
      date: "2024-02-01", 
      time: "10:15 AM",
      patientId: "240 - 03",
      age: 53,
      sex: "Female",
      bloodType: "AB+",
      allergies: ["Aspirin", "Shell fish"],
      addedComplaints: "Follow-up for hypertension management. Reports compliance with medication regimen.",
      history: [
        {
          lastChecked: "20 November 2020",
          prescriptionId: "5D823FG1",
          observation: "Hypertension, controlled with medication. BP 138/85.",
          prescriptions: [
            "Lisinopril 10mg - Daily",
            "Low sodium diet",
          ],
          note: "Continue current management. Schedule follow-up in 3 months.",
        }
      ]
    }
  ];

  // Current patient data
  const currentPatient = patientsData[currentPatientIndex];

  // Handle new record creation
  const handleCreateRecord = async (recordData) => {
    try {
      setLoading(true);
      setMessage('');

      // Add doctor ID to the form data
      const formData = {
        ...recordData,
        doctorId,
        date: new Date().toISOString().split('T')[0], // Today's date if not provided
        patientId: currentPatient.patientId
      };

      // Mock function for creating record
      const createRecord = async (data) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ success: true, data });
          }, 1000);
        });
      };

      const data = await createRecord(formData);
      console.log('Record created:', data);
      setMessage('Record created successfully!');

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

  // Navigation functions for patient history
  const nextHistory = () => {
    if (currentHistoryIndex < currentPatient.history.length - 1) {
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
      // If we're at the last patient, show a message or some indication
      console.log("End of patient list reached");
    }
  };

  // Get current history item
  const currentHistory = currentPatient.history[currentHistoryIndex];

  return (
    <div className="grid grid-flow-col grid-cols-[minmax(0,350px)_minmax(0,1fr)] justify-center align-middle gap-4 w-full">
      <div className="flex flex-col gap-2 space-y-4 w-full">
        
        {/* Session Info */}
        <div className="pr-2 pl-2 h-30">
          <div className="flex items-center justify-between bg-[#CFE6F5] rounded-3xl p-6 w-full">
            {/* Left Section: Session ID */}
            <div>
              <p className="text-lg font-semibold text-gray-900">Session ID</p>
              <p className="text-2xl font-bold text-[#5B89A6]">#{sessionData[0].sessionId}</p>
            </div>
            {/* Right Section: Left & Total */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-md font-medium text-[#5B89A6]">Left</p>
                <p className="text-3xl font-bold text-[#5B89A6]">{sessionData[0].left}</p>
              </div>
              <div className="text-center">
                <p className="text-md font-medium text-[#2E5D78]">Total</p>
                <p className="text-4xl font-extrabold text-[#2E5D78]">{sessionData[0].total}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Waiting List - Highlighting the current patient */}
        <div className="flex rounded-[20px] bg-white shadow-md flex-col gap-3 pr-2">
          <div className="font-[500] text-[1.5rem] pl-5 pt-4 text-gray-800">
            Waiting List
          </div>
          <div className="max-h-[250px] overflow-y-auto w-full space-y-4 p-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
            {patientsData.map((patient, index) => (
              <div key={index} 
                className={`flex items-center ${index === currentPatientIndex ? 'bg-blue-100 border-2 border-blue-300' : 'bg-blue-50'} rounded-lg p-4 w-full h-[80px]`}>
                <div className="flex items-center justify-center w-12 h-12 bg-blue-200 rounded-full text-lg font-bold text-blue-600">
                  {patient.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h3 className="text-gray-800 font-semibold text-lg">{patient.name}</h3>
                  <p className="text-gray-500 text-sm">
                    {patient.date} <span className="mx-2">|</span> {patient.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Patient Details - Showing the current patient */}
      <div className="w-full h-full">
        <div className="p-6 bg-white flex flex-col rounded-[40px] shadow-md h-full">
          {/* Top Section */}
          <div className="flex justify-between flex-1">
            {/* Left: Patient Details */}
            <div className="w-1/2 pr-8">
              <h2 className="text-2xl font-bold">On-going - Patient Details</h2>
              <div className="flex items-center mt-4">
                {/* Patient Avatar */}
                <div className="h-16 w-16 flex items-center justify-center bg-blue-100 text-blue-600 text-xl font-bold rounded-full border border-blue-300">
                  {currentPatient.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .toUpperCase()}
                </div>
                <div className="ml-4">
                  <p className="text-lg font-bold">{currentPatient.name}</p>
                  <p className="text-gray-500">Patient ID - {currentPatient.patientId}</p>
                </div>
              </div>

              <div className="mt-4 text-gray-700">
                <p><strong>Sex:</strong> {currentPatient.sex}</p>
                <p><strong>Age:</strong> {currentPatient.age}</p>
                <p><strong>Blood:</strong> {currentPatient.bloodType}</p>
                <p><strong>Allergies:</strong></p>
                <ul className="list-disc pl-5">
                  {currentPatient.allergies.length > 0 ? (
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
              <p className="text-gray-600">{currentPatient.addedComplaints}</p>
            </div>

            {/* Right: Consultation History */}
            <div className="w-1/2 pl-8">
              <h2 className="text-2xl font-bold">Consultation History</h2>
              {currentPatient.history.length > 0 ? (
                <div className="mt-4 text-gray-700">
                  <p>
                    <strong>Last Checked:</strong> {currentHistory.lastChecked} 
                    <a href="#" className="text-blue-600 underline ml-2">
                      #{currentHistory.prescriptionId}
                    </a>
                  </p>
                  <p><strong>Observation:</strong> {currentHistory.observation}</p>
                  <p><strong>Prescription:</strong></p>
                  <ul className="list-disc pl-5">
                    {currentHistory.prescriptions.map((prescription, index) => (
                      <li key={index}>{prescription}</li>
                    ))}
                  </ul>
                  <p><strong>Note:</strong> {currentHistory.note}</p>
                  {currentPatient.history.length > 1 && (
                    <div className="">
                      <button 
                        className={`text-gray-500 text-2xl ${currentHistoryIndex === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`} 
                        onClick={prevHistory}
                        disabled={currentHistoryIndex === 0}
                      >
                        &lt;
                      </button>
                      <button 
                        className={`text-gray-500 text-2xl ${currentHistoryIndex === currentPatient.history.length - 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`} 
                        onClick={nextHistory}
                        disabled={currentHistoryIndex === currentPatient.history.length - 1}
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
            <button 
              className="bg-blue-100 hover:bg-blue-200 text-blue-600 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
              onClick={() => handleCreateRecord(formData)}
            >
              Save
            </button>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
              onClick={handleNextPatient}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitingPlusDetails;
import React, { useState } from "react";

const patientData = {
  name: "Denzel White",
  patientId: "200 - 01",
  age: 28,
  sex: "Male",
  bloodType: "O+",
  allergies: ["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet"],
  addedComplaints:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis.",
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
    {
      lastChecked: "18 June 2021",
      prescriptionId: "8F34PLX9",
      observation: "Sore throat and mild fever.",
      prescriptions: ["Antibiotic - 5 days", "Gargle with warm salt water"],
      note: "Recheck in 7 days if symptoms persist.",
    },
  ],
};

const PatientDetailsCardType1 = () => {
  const [formData, setFormData] = useState({
    observation: "",
    prescription: "",
    note: "",
  });

  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);

  // Get current history item
  const currentHistory = patientData.history[currentHistoryIndex];

  // Navigation functions
  const nextHistory = () => {
    if (currentHistoryIndex < patientData.history.length - 1) {
      setCurrentHistoryIndex(currentHistoryIndex + 1);
    }
  };

  const prevHistory = () => {
    if (currentHistoryIndex > 0) {
      setCurrentHistoryIndex(currentHistoryIndex - 1);
    }
  };

  return (
    <div className="p-6 bg-white flex flex-col rounded-[40px] shadow-md max-auto mr-2">
      {/* Top Section */}
      <div className="flex justify-between">

        {/* Left: Patient Details */}
        <div className="w-1/2  pr-8">
          <h2 className="text-2xl font-bold">On-going - Patient Details</h2>
          <div className="flex items-center mt-4">
            {/* Patient Avatar */}
            <div className="h-16 w-16 flex items-center justify-center bg-blue-100 text-blue-600 text-xl font-bold rounded-full border border-blue-300">
              {patientData.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .toUpperCase()}
            </div>
            <div className="ml-4">
              <p className="text-lg font-bold">{patientData.name}</p>
              <p className="text-gray-500">Patient ID - {patientData.patientId}</p>
            </div>
          </div>

          <div className="mt-4 text-gray-700">
            <p><strong>Sex:</strong> {patientData.sex}</p>
            <p><strong>Age:</strong> {patientData.age}</p>
            <p><strong>Blood:</strong> {patientData.bloodType}</p>
            <p><strong>Allergies:</strong></p>
            <ul className="list-disc pl-5">
              {patientData.allergies.map((allergy, index) => (
                <li key={index}>{allergy}</li>
              ))}
            </ul>
          </div>

          <hr className="my-4" />

          <h3 className="font-semibold">Added Complaints</h3>
          <p className="text-gray-600">{patientData.addedComplaints}</p>
        </div>

        {/* Right: Consultation History */}
        <div className="w-1/2 pl-8">
          <h2 className="text-2xl font-bold">Consultation History</h2>
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
            <div className=" ">
            <button 
              className={`text-gray-500 text-2xl ${currentHistoryIndex === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`} 
              onClick={prevHistory}
              disabled={currentHistoryIndex === 0}
            >
              &lt;
            </button>
            <button 
              className={`text-gray-500 text-2xl ${currentHistoryIndex === patientData.history.length - 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`} 
              onClick={nextHistory}
              disabled={currentHistoryIndex === patientData.history.length - 1}
            >
              &gt;
            </button>
          </div>
          </div>

          {/* Navigation Buttons */}
          
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
        <button className="text-blue-500 font-semibold">Save</button>
        <button className="text-blue-900 font-semibold">Next</button>
      </div>
    </div>
  );
};

export default PatientDetailsCardType1;
